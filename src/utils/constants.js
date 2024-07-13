export const BACKEND_BASE_URL = "http://localhost:5000/"
export const TAGS_PROMPT = "Generate me a list of tags I could use for Etsy SEO optimization of my -INSERT IDEA HERE- listing. Separate these tags using a comma and write out nothing else."
export const TITLE_PROMPT = "Generate me a list of synonyms I could use in the title of my -INSERT IDEA HERE- listing of Etsy. They should be some phrases that people usually type in the search bar when looking for similar items. The first letter of every word in a synonym should be capitalized. Separate these tags using a comma and write out nothing else."
export const IDEA_PROMPT = "Generate me a list of ideas about -INSERT TREND HERE- that are funny and could be put on a t-shirt."
export const nullDesign = Object.freeze({
      "design_name": "Unnamed design",
      "design_id": null,
      "related_links": [],
      "image_links": [],
      "tags": [],
      "title": ""
    })

export const COUNTRY_CODES = [
  { name: 'United States', code: 'US' },
  { name: 'France', code: 'FR' },
  { name: 'Germany', code: 'DE' },
  { name: 'Croatia', code: 'HR' },
  { name: 'Spain', code: 'ES' },
  { name: 'Great Britain', code: 'GB' },
  { name: 'Japan', code: 'JP' },
  { name: 'Australia', code: 'AU' },
  { name: 'Austria', code: 'AT' },
]