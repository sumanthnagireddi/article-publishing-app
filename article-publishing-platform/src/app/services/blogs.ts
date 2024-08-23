export const BLOGS = [
    {
        "kind": "blogger#blog1",
        "id": "2399953",
        "name": "Blogger Buzz1",
        "description": "The Official Buzz from Blogger at Google",
        "published": "2007-04-23T22:17:29.261Z",
        "updated": "2011-08-02T06:01:15.941Z",
        "url": "http://buzz.blogger.com/",
        "selfLink": "https://www.googleapis.com/blogger/v3/blogs/2399953",
        "posts": {
            "totalItems": 494,
            "selfLink": "https://www.googleapis.com/blogger/v3/blogs/2399953/posts"
        },
        "pages": {
            "totalItems": 2,
            "selfLink": "https://www.googleapis.com/blogger/v3/blogs/2399953/pages"
        },
        "locale": {
            "language": "en",
            "country": "",
            "variant": ""
        }
    },
    {
        "kind": "blogger#blog2",
        "id": "2399953",
        "name": "Blogger Buzz2",
        "description": "The Official Buzz from Blogger at Google",
        "published": "2007-04-23T22:17:29.261Z",
        "updated": "2011-08-02T06:01:15.941Z",
        "url": "http://buzz.blogger.com/",
        "selfLink": "https://www.googleapis.com/blogger/v3/blogs/2399953",
        "posts": {
            "totalItems": 494,
            "selfLink": "https://www.googleapis.com/blogger/v3/blogs/2399953/posts"
        },
        "pages": {
            "totalItems": 2,
            "selfLink": "https://www.googleapis.com/blogger/v3/blogs/2399953/pages"
        },
        "locale": {
            "language": "en",
            "country": "",
            "variant": ""
        }
    },
    {
        "kind": "blogger#blog3",
        "id": "2399953",
        "name": "Blogger Buzz3",
        "description": "The Official Buzz from Blogger at Google",
        "published": "2007-04-23T22:17:29.261Z",
        "updated": "2011-08-02T06:01:15.941Z",
        "url": "http://buzz.blogger.com/",
        "selfLink": "https://www.googleapis.com/blogger/v3/blogs/2399953",
        "posts": {
            "totalItems": 494,
            "selfLink": "https://www.googleapis.com/blogger/v3/blogs/2399953/posts"
        },
        "pages": {
            "totalItems": 2,
            "selfLink": "https://www.googleapis.com/blogger/v3/blogs/2399953/pages"
        },
        "locale": {
            "language": "en",
            "country": "",
            "variant": ""
        }
    }
]

export const TOOLBAR= [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],

    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction

    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],

    ['clean'],                                         // remove formatting button

    ['link', 'image', 'video']                         // link and image, video
  ]