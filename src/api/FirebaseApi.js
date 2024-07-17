import { BACKEND_BASE_URL } from '../utils/constants'
import { base64ToBlob, blobToBase64, query } from '../utils/functions';

export const uploadImgToFirebaseStorage = async (base64String, design_id) => {
    let formData = new FormData();
    formData.append("image", base64ToBlob(base64String), "image.png");
    formData.append("design_id", design_id);

    try {
        let response = await fetch(BACKEND_BASE_URL + 'storage', {
            method: "POST",
            body: formData
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        let data = await response.json();
        if (data.url) {
            return data.url;
        } else {
            throw new Error('No URL returned from the backend');
        }
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

export const getAllDesignsFromStorage = async () => {
    return await query('db/allDesigns', 'GET', null);
}

export const uploadDesignToRealtimeDb = async (design) => {
    try {
        let response = await fetch(BACKEND_BASE_URL + 'db/saveDesign', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(design)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.text();

    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

// CORS HAS TO BE ENABLED IN GOOGLE CLOUD! SEE https://stackoverflow.com/questions/37760695/firebase-storage-and-access-control-allow-origin
export const convertImageUrlToBase64 = async (imagePath) => {
  try {
    const response = await fetch(imagePath);
    const blob = await response.blob();

    const base64String = await blobToBase64(blob);

    return base64String;
  } catch (error) {
    console.error("Error fetching image:", error);
    throw error; 
  }
}

export const deleteImageFromStorage = async (url) => {
    try {
        const response = await query('storageDelete', 'DELETE', JSON.stringify({ 'imgUrl' : url }));
        console.log("Image deleted successfully");
        return true;
    }
    catch (error) {
        console.log(error);
        console.log("Failed to delete image at " + url);
        return false;
    }
}

export const deleteDesignFromDb = async (id) => {
    try {
        let response = await fetch(BACKEND_BASE_URL + 'db/deleteDesign', {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'design_id' : id })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        console.log("Design deleted successfully");
        return await response.text();

    } catch (error) {
        console.error('Error:', error);
        console.log("Failed to delete design with id " + id);
        return false;
    }
}

export const downloadDesign = async (design) => {
    try {
      const response = await fetch(BACKEND_BASE_URL + '/downloadDesign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(design),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }
  
      // Check if the response is JSON (error) or a file (success)
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        const data = await response.json();
        console.error('Error from server:', data.error);
        return { success: false, error: data.error };
      }
  
      // If it's not JSON, it's the file download
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const fileName = `${design.design_name}_${design.design_id || 'noID'}.zip`;
  
      return { success: true, url, fileName };
  
    } catch (error) {
      console.error('Error downloading design:', error);
      return { success: false, error: error.message };
    }
  }