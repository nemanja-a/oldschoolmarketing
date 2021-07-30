export const ROWS_PER_PAGE = 14
export const COLUMNS_PER_ROW = 19
export const TOTAL_PAGE_COUNT = 3333
export const NAVIGATION_BUTTONS_COUNT = 5
export const DEFAULT_MODAL_WEBSITE_IMAGE = 'https://www.contentviewspro.com/wp-content/uploads/2017/07/default_image.png'

export const WEBSITE = { 
    TITLE_MAX_LENGTH: 40,
    DESCRIPTION_MAX_LENGTH: 60,
    THUMBNAIL: {
        DEFAULT: '/images/Logo.jpg',
        NO_IMAGE_FOUND: '/images/no-image-found-360x260.png'
    },
    DEFAULT: {
        url: '',
        title: 'Website title',
        titleOpacity: 10,
        titleColor: "#fff",
        titleBackgroundColor: "#ffaa4e",
        titlePosition: 0,
        titleHeight: 19,
        description: 'Website description',
        descriptionOpacity: 10,
        descriptionColor: "#fff",
        descriptionBackgroundColor: "#ffaa4e",
        descriptionPosition: 90,
        descriptionHeight: 19,
        image: null,
        thumbnail: { url: '/images/Logo.jpg' },
        imageWidth: 0,
        imageHeight: 0,
        categories: []
    },
    CATEGORIES: [
        {value: 0, displayValue: "Business"},
        {value: 1, displayValue: "E-commerce"},
        {value: 2, displayValue: "Biography"},
        {value: 3, displayValue: "Branding"},
        {value: 4, displayValue: "Portfolio"},
        {value: 5, displayValue: "Personal"},
        {value: 6, displayValue: "Entertainment"},
        {value: 7, displayValue: "News"},
        {value: 8, displayValue: "Media"},
        {value: 9, displayValue: "Political"},
        {value: 10, displayValue: "Educational"},
        {value: 11, displayValue: "Nonprofil or charity"},
        {value: 12, displayValue: "Web portal"},
        {value: 13, displayValue: "Community forum"},
        {value: 14, displayValue: "Blog"},
        {value: 15, displayValue: "Catalog or brochure"},
        {value: 16, displayValue: "Social Media"},
        {value: 17, displayValue: "Streaming"},
        {value: 18, displayValue: "Job board"},
        {value: 19, displayValue: "Traveling"},
        {value: 20, displayValue: "Food and drinks"},
        {value: 21, displayValue: "Science and Technology"},
        {value: 22, displayValue: "Fashion"},
        {value: 23, displayValue: "Cars"},
        {value: 24, displayValue: "Advertising"}
    ]
}

export const ALLOWED_FORMATS = 'image/jpeg, image/jpg, image/png'

export const REFERER_HEADER_MAX_LENGTH = 2083

export const LINKED_IN_PROFILE_URL = "https://www.linkedin.com/in/nemanja-apostolovic-9178a0156/"