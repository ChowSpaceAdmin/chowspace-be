const express = require('express');
const cors = require('cors');

const PORT = 8000;

const app = express();

app.use(express.json());
app.use(cors());

app.post('/api/account', (req, res) => {
    res.send({
        "success": true,
        "data": {
            "id": "199c4998-394a-4c95-89f2-76df97b6af15",
            "name": "Jason Statham",
            "isVerified": false,
            "image": "https://content-static.upwork.com/uploads/2014/10/01073427/profilephoto1.jpg",
            "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxOTljNDk5OC0zOTRhLTRjOTUtODlmMi03NmRmOTdiNmFmMTUiLCJleHAiOiIxNTUyNjA0NDAwIn0.-9L7Rd6qhdhM5iCuwf3E3zbE0Q8Q0yZAxxFqXlgtycA",
            "accessExp": 20,
            "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxOTljNDk5OC0zOTRhLTRjOTUtODlmMi03NmRmOTdiNmFmMTUiLCJleHAiOiIxNTUyNjA0NDAwIn0.-9L7Rd6qhdhM5iCuwf3E3zbE0Q8Q0yZAxxFqXlgtycA",
            "refreshExp": 20
        }
    });
});

app.post('/api/account/changePassword', (req, res) => {
    res.send({
        "success": true
    });
});

app.post('/api/authentication/login', (req, res) => {
    res.send({
        "success": true,
        "data": {
            "id": "199c4998-394a-4c95-89f2-76df97b6af15",
            "name": "Jason Statham",
            "isVerified": false,
            "image": "https://content-static.upwork.com/uploads/2014/10/01073427/profilephoto1.jpg",
            "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxOTljNDk5OC0zOTRhLTRjOTUtODlmMi03NmRmOTdiNmFmMTUiLCJleHAiOiIxNTUyNjA0NDAwIn0.-9L7Rd6qhdhM5iCuwf3E3zbE0Q8Q0yZAxxFqXlgtycA",
            "accessExp": 20,
            "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxOTljNDk5OC0zOTRhLTRjOTUtODlmMi03NmRmOTdiNmFmMTUiLCJleHAiOiIxNTUyNjA0NDAwIn0.-9L7Rd6qhdhM5iCuwf3E3zbE0Q8Q0yZAxxFqXlgtycA",
            "refreshExp": 20
        }
    });
});

app.post('/api/authentication/refresh', (req, res) => {
    res.send({
        "success": true,
        "data": {
            "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxOTljNDk5OC0zOTRhLTRjOTUtODlmMi03NmRmOTdiNmFmMTUiLCJleHAiOiIxNTUyNjA0NDAwIn0.-9L7Rd6qhdhM5iCuwf3E3zbE0Q8Q0yZAxxFqXlgtycA",
            "accessExp": 20,
            "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxOTljNDk5OC0zOTRhLTRjOTUtODlmMi03NmRmOTdiNmFmMTUiLCJleHAiOiIxNTUyNjA0NDAwIn0.-9L7Rd6qhdhM5iCuwf3E3zbE0Q8Q0yZAxxFqXlgtycA",
            "refreshExp": 20
        }
    });
});

app.get('/api/profile', (req, res) => {
    res.send({
        "success": true,
        "data": {
            "id": "199c4998-394a-4c95-89f2-76df97b6af15",
            "email": "jason@statham.com",
            "name": "Jason Statham",
            "isVerified": false,
            "image": "https://content-static.upwork.com/uploads/2014/10/01073427/profilephoto1.jpg",
            "telephones": ["089-041-6252", "029340143222"]
        }
    });
});

app.patch('/api/profile', (req, res) => {
    res.send({
        "success": true,
        "data": {
            "id": "199c4998-394a-4c95-89f2-76df97b6af15",
            "email": "jason@statham.com",
            "name": "Jason Statham",
            "isVerified": false,
            "image": "https://content-static.upwork.com/uploads/2014/10/01073427/profilephoto1.jpg",
            "telephones": ["089-041-6252", "029340143222"]
        }
    });
});

app.get('/api/profile/:id', (req, res) => {
    res.send({
        "success": true,
        "data": {
            "id": "199c4998-394a-4c95-89f2-76df97b6af15",
            "name": "Mary Jane",
            "image": "https://content-static.upwork.com/uploads/2014/10/01073427/profilephoto1.jpg",
            "telephones": ["089-041-6252", "029340143222"]
        }
    });
});

app.post('/api/place', (req, res) => {
    res.send({
        "success": true,
        "data": {
            "id": "199c4998-394a-4c95-89f2-76df97b6af15",
            "nameid": "siam-paragon",
            "name": "Siam Paragon",
            "description": "Mall for high end people",
            "address": "123 Street, Silom, Bangkok, Thailand",
            "location": "Bangkok",
            "latitude": 33,
            "longitude": 22,
            "primaryImage": "http://static.asiawebdirect.com/m/bangkok/portals/bangkok-com/homepage/shopping-mall/siam-paragon/pagePropertiesImage/siam-paragon.jpg",
            "isVerified": false,
            "images": [ 
                "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Thailand_Bangkok_SiamParagon_Night.jpg/1200px-Thailand_Bangkok_SiamParagon_Night.jpg", 
                "http://static.asiawebdirect.com/m/bangkok/portals/bangkok-com/homepage/shopping-mall/siam-paragon/allParagraphs/BucketComponent/ListingContainer/02/image/siam-paragon-4.jpg" 
            ],
            "telephones": ["089-041-6252", "029340143222"],
            "keywords": [
                {
                    "name": "Mall",
                    "icon": "https://image.flaticon.com/icons/svg/1588/1588094.svg"
                },
                {
                    "name": "Market",
                    "icon": "https://image.flaticon.com/icons/svg/1588/1588098.svg"
                }
            ],
            "openTime": [
                {
                    "day": "Mon",
                    "from": "10:00",
                    "till": "22:00"
                },
                {
                    "day": "Tue",
                    "from": "11:00",
                    "till": "23:00"
                }
            ],
            "by": {
                "id": "199c4998-394a-4c95-89f2-76df97b6af15",
                "name": "Mary Jane",
                "image": "https://content-static.upwork.com/uploads/2014/10/01073427/profilephoto1.jpg",
                "telephones": ["089-041-6252", "029340143222"]
            },
            "rating": 3,
            "reviews": [
                {
                    "id": "199c4998-394a-4c95-89f2-76df97b6af15",
                    "title": "Good",
                    "description": "Very Good Shopping Place",
                    "rating": 5,
                    "by": {
                        "id": "199c4998-394a-4c95-89f2-76df97b6af15",
                        "name": "Mary Jane",
                        "image": "https://content-static.upwork.com/uploads/2014/10/01073427/profilephoto1.jpg",
                        "telephones": ["089-041-6252", "029340143222"]
                    }
                }
            ],
            "spaces": [
                    {
                        "id": "199c4998-394a-4c95-89f2-76df97b6af15",
                        "name": "Indoor Yen Cooler",
                        "description": "Space within walking distance from center",
                        "capacity": 2,
                        "dimension": 22,
                        "amount": 1,
                        "primaryImage": "https://www.nvrc.ca/sites/default/files/images/Facilities-Fields/maple.jpg",
                        "images": [
                            "http://cdn.home-designing.com/wp-content/uploads/2016/05/Kitchen-Eating-Space.jpg", 
                            "https://www.nvrc.ca/sites/default/files/images/Facilities-Fields/jaycee_house.jpg"
                        ],
                        "keywords": [
                            {
                                "name": "wifi",
                                "icon": "https://image.flaticon.com/icons/png/512/1637/1637453.png"
                            },
                            {
                               "name": "microphone",
                               "icon": "https://image.flaticon.com/icons/svg/784/784684.svg" 
                            }
                        ],
                        "prices": [
                            {
                                "type": "HL",
                                "price": 200,
                                "amount": 1,
                                "time": {
                                    "from": "10:00",
                                    "till": "22:00"
                                }
                            },
                            {
                                "type": "DL",
                                "price": 200,
                                "amount": 1,
                                "time": null
                            } 
                        ]
                    }
            ]
        }
    });
});

app.get('/api/place', (req, res) => {
    res.send({
        "success": true,
        "data": {
            "places": [
                {
                    "id": "199c4998-394a-4c95-89f2-76df97b6af15",
                    "nameid": "siam-paragon",
                    "name": "Siam Paragon",
                    "description": "Mall for high end people",
                    "location": "Bangkok",
                    "latitude": 33,
                    "longitude": 22,
                    "rating": 2,
                    "primaryImage": "http://static.asiawebdirect.com/m/bangkok/portals/bangkok-com/homepage/shopping-mall/siam-paragon/pagePropertiesImage/siam-paragon.jpg",
                    "keywords": [
                        {
                            "name": "Mall",
                            "icon": "https://image.flaticon.com/icons/svg/1588/1588094.svg"
                        },
                        {
                            "name": "Market",
                            "icon": "https://image.flaticon.com/icons/svg/1588/1588098.svg"
                        }
                    ],
                    "by": {
                        "id": "199c4998-394a-4c95-89f2-76df97b6af15",
                        "name": "Mary Jane",
                        "image": "https://content-static.upwork.com/uploads/2014/10/01073427/profilephoto1.jpg",
                        "telephones": ["089-041-6252", "029340143222"]
                    }
                },
                {
                    "id": "199c4998-394a-4c95-89f2-76df97b6af15",
                    "nameid": "siam-paragon",
                    "name": "Siam Paragon",
                    "description": "Mall for high end people",
                    "location": "Bangkok",
                    "latitude": 33,
                    "longitude": 22,
                    "rating": 2,
                    "primaryImage": "http://static.asiawebdirect.com/m/bangkok/portals/bangkok-com/homepage/shopping-mall/siam-paragon/pagePropertiesImage/siam-paragon.jpg",
                    "keywords": [
                        {
                            "name": "Mall",
                            "icon": "https://image.flaticon.com/icons/svg/1588/1588094.svg"
                        },
                        {
                            "name": "Market",
                            "icon": "https://image.flaticon.com/icons/svg/1588/1588098.svg"
                        }
                    ],
                    "by": {
                        "id": "199c4998-394a-4c95-89f2-76df97b6af15",
                        "name": "Mary Jane",
                        "image": "https://content-static.upwork.com/uploads/2014/10/01073427/profilephoto1.jpg",
                        "telephones": ["089-041-6252", "029340143222"]
                    }
                }    
            ]
        }
    });
});

app.get('/api/place/:id', (req, res) => {
    res.send({
        "success": true,
        "data": {
            "id": "199c4998-394a-4c95-89f2-76df97b6af15",
            "nameid": "siam-paragon",
            "name": "Siam Paragon",
            "description": "Mall for high end people",
            "address": "123 Street, Silom, Bangkok, Thailand",
            "location": "Bangkok",
            "latitude": 33,
            "longitude": 22,
            "primaryImage": "http://static.asiawebdirect.com/m/bangkok/portals/bangkok-com/homepage/shopping-mall/siam-paragon/pagePropertiesImage/siam-paragon.jpg",
            "isVerified": false,
            "images": [ 
                "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Thailand_Bangkok_SiamParagon_Night.jpg/1200px-Thailand_Bangkok_SiamParagon_Night.jpg", 
                "http://static.asiawebdirect.com/m/bangkok/portals/bangkok-com/homepage/shopping-mall/siam-paragon/allParagraphs/BucketComponent/ListingContainer/02/image/siam-paragon-4.jpg" 
            ],
            "telephones": ["089-041-6252", "029340143222"],
            "keywords": [
                {
                    "name": "Mall",
                    "icon": "https://image.flaticon.com/icons/svg/1588/1588094.svg"
                },
                {
                    "name": "Market",
                    "icon": "https://image.flaticon.com/icons/svg/1588/1588098.svg"
                }
            ],
            "openTime": [
                {
                    "day": "Mon",
                    "from": "10:00",
                    "till": "22:00"
                },
                {
                    "day": "Tue",
                    "from": "11:00",
                    "till": "23:00"
                }
            ],
            "by": {
                "id": "199c4998-394a-4c95-89f2-76df97b6af15",
                "name": "Mary Jane",
                "image": "https://content-static.upwork.com/uploads/2014/10/01073427/profilephoto1.jpg",
                "telephones": ["089-041-6252", "029340143222"]
            },
            "rating": 3,
            "reviews": [
                {
                    "id": "199c4998-394a-4c95-89f2-76df97b6af15",
                    "title": "Good",
                    "description": "Very Good Shopping Place",
                    "rating": 5,
                    "by": {
                        "id": "199c4998-394a-4c95-89f2-76df97b6af15",
                        "name": "Mary Jane",
                        "image": "https://content-static.upwork.com/uploads/2014/10/01073427/profilephoto1.jpg",
                        "telephones": ["089-041-6252", "029340143222"]
                    }
                }
            ],
            "spaces": [
                    {
                        "id": "199c4998-394a-4c95-89f2-76df97b6af15",
                        "name": "Indoor Yen Cooler",
                        "description": "Space within walking distance from center",
                        "capacity": 2,
                        "dimension": 22,
                        "amount": 1,
                        "primaryImage": "https://www.nvrc.ca/sites/default/files/images/Facilities-Fields/maple.jpg",
                        "images": [
                            "http://cdn.home-designing.com/wp-content/uploads/2016/05/Kitchen-Eating-Space.jpg", 
                            "https://www.nvrc.ca/sites/default/files/images/Facilities-Fields/jaycee_house.jpg"
                        ],
                        "keywords": [
                            {
                                "name": "wifi",
                                "icon": "https://image.flaticon.com/icons/png/512/1637/1637453.png"
                            },
                            {
                               "name": "microphone",
                               "icon": "https://image.flaticon.com/icons/svg/784/784684.svg" 
                            }
                        ],
                        "prices": [
                            {
                                "type": "HL",
                                "price": 200,
                                "amount": 1,
                                "time": {
                                    "from": "10:00",
                                    "till": "22:00"
                                }
                            },
                            {
                                "type": "DL",
                                "price": 200,
                                "amount": 1,
                                "time": null
                            } 
                        ]
                    }
            ]
        }
    });
});

app.patch('/api/place/:id', (req, res) => {
    res.send({
        "success": true,
        "data": {
            "id": "199c4998-394a-4c95-89f2-76df97b6af15",
            "nameid": "siam-paragon",
            "name": "Siam Paragon",
            "description": "Mall for high end people",
            "address": "123 Street, Silom, Bangkok, Thailand",
            "location": "Bangkok",
            "latitude": 33,
            "longitude": 22,
            "primaryImage": "http://static.asiawebdirect.com/m/bangkok/portals/bangkok-com/homepage/shopping-mall/siam-paragon/pagePropertiesImage/siam-paragon.jpg",
            "isVerified": false,
            "images": [ 
                "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Thailand_Bangkok_SiamParagon_Night.jpg/1200px-Thailand_Bangkok_SiamParagon_Night.jpg", 
                "http://static.asiawebdirect.com/m/bangkok/portals/bangkok-com/homepage/shopping-mall/siam-paragon/allParagraphs/BucketComponent/ListingContainer/02/image/siam-paragon-4.jpg" 
            ],
            "telephones": ["089-041-6252", "029340143222"],
            "keywords": [
                {
                    "name": "Mall",
                    "icon": "https://image.flaticon.com/icons/svg/1588/1588094.svg"
                },
                {
                    "name": "Market",
                    "icon": "https://image.flaticon.com/icons/svg/1588/1588098.svg"
                }
            ],
            "openTime": [
                {
                    "day": "Mon",
                    "from": "10:00",
                    "till": "22:00"
                },
                {
                    "day": "Tue",
                    "from": "11:00",
                    "till": "23:00"
                }
            ],
            "by": {
                "id": "199c4998-394a-4c95-89f2-76df97b6af15",
                "name": "Mary Jane",
                "image": "https://content-static.upwork.com/uploads/2014/10/01073427/profilephoto1.jpg",
                "telephones": ["089-041-6252", "029340143222"]
            },
            "rating": 3,
            "reviews": [
                {
                    "id": "199c4998-394a-4c95-89f2-76df97b6af15",
                    "title": "Good",
                    "description": "Very Good Shopping Place",
                    "rating": 5,
                    "by": {
                        "id": "199c4998-394a-4c95-89f2-76df97b6af15",
                        "name": "Mary Jane",
                        "image": "https://content-static.upwork.com/uploads/2014/10/01073427/profilephoto1.jpg",
                        "telephones": ["089-041-6252", "029340143222"]
                    }
                }
            ],
            "spaces": [
                {
                    "id": "199c4998-394a-4c95-89f2-76df97b6af15",
                    "name": "Indoor Yen Cooler",
                    "description": "Space within walking distance from center",
                    "capacity": 2,
                    "dimension": 22,
                    "amount": 1,
                    "primaryImage": "https://www.nvrc.ca/sites/default/files/images/Facilities-Fields/maple.jpg",
                    "images": [
                        "http://cdn.home-designing.com/wp-content/uploads/2016/05/Kitchen-Eating-Space.jpg", 
                        "https://www.nvrc.ca/sites/default/files/images/Facilities-Fields/jaycee_house.jpg"
                    ],
                    "keywords": [
                        {
                            "name": "wifi",
                            "icon": "https://image.flaticon.com/icons/png/512/1637/1637453.png"
                        },
                        {
                            "name": "microphone",
                            "icon": "https://image.flaticon.com/icons/svg/784/784684.svg" 
                        }
                    ],
                    "prices": [
                        {
                            "type": "HL",
                            "price": 200,
                            "amount": 1,
                            "time": {
                                "from": "10:00",
                                "till": "22:00"
                            }
                        },
                        {
                            "type": "DL",
                            "price": 200,
                            "amount": 1,
                            "time": null
                        } 
                    ]
                },
                {
                    "id": "199c4998-394a-4c95-89f2-76df97b6af15",
                    "name": "Outndoor Ron Hot",
                    "description": "Space in direct sunlight",
                    "capacity": 5,
                    "dimension": 30,
                    "amount": 2,
                    "primaryImage": "https://www.visittuscany.com/shared/visittuscany/immagini/tematismo/top-img-outdoor.jpg?__scale=w:1200,h:800,t:2,q:85",
                    "images": [
                        "https://www.khioneoutdoorgear.com/staging/nate/wp-content/uploads/2018/02/cropped-20170907_Khione-Shel_0009-copy-2.jpg", 
                        "https://www.mensjournal.com/wp-content/uploads/mf/_outdoor_survival_1.jpg"
                    ],
                    "keywords": [
                        {
                            "name": "wifi",
                            "icon": "https://image.flaticon.com/icons/png/512/1637/1637453.png"
                        },
                        {
                            "name": "microphone",
                            "icon": "https://image.flaticon.com/icons/svg/784/784684.svg" 
                        }
                    ],
                    "prices": [
                        {
                            "type": "HL",
                            "price": 100,
                            "amount": 2,
                            "time": {
                                "from": "10:00",
                                "till": "22:00"
                            }
                        },
                        {
                            "type": "DL",
                            "price": 400,
                            "amount": 1,
                            "time": null
                        } 
                    ]
                }
            ]
        }
    });
});

app.delete('/apiplace/:id', (req, res) => {
    res.send({
        "success": true
    });
});

app.post('/api/space', (req, res) => {
    res.send({
        "success": true,
        "data": {
            "placeid": "199c4998-394a-4c95-89f2-76df97b6af15",
            "id": "199c4998-394a-4c95-89f2-76df97b6af15",
            "name": "Indoor Yen Cooler",
            "description": "Space within walking distance from center",
            "dimension": 22,
            "capacity": 2,
            "amount": 1,
            "primaryImage": "https://www.nvrc.ca/sites/default/files/images/Facilities-Fields/maple.jpg",
            "images": [
                "http://cdn.home-designing.com/wp-content/uploads/2016/05/Kitchen-Eating-Space.jpg", 
                "https://www.nvrc.ca/sites/default/files/images/Facilities-Fields/jaycee_house.jpg"
            ],
            "keywords": [
                {
                    "name": "wifi",
                    "icon": "https://image.flaticon.com/icons/png/512/1637/1637453.png"
                },
                {
                   "name": "microphone",
                   "icon": "https://image.flaticon.com/icons/svg/784/784684.svg" 
                }
            ],
            "prices": [
                {
                    "type": "HL",
                    "price": 200,
                    "amount": 1,
                    "time": {
                        "from": "10:00",
                        "till": "22:00"
                    }
                },
                {
                    "type": "DL",
                    "price": 200,
                    "amount": 1,
                    "time": null
                } 
            ]
        }
    });
});

app.get('/api/space/:id', (req, res) => {
    res.send({
        "success": true,
        "data": {
            "placeid": "199c4998-394a-4c95-89f2-76df97b6af15",
            "id": "199c4998-394a-4c95-89f2-76df97b6af15",
            "name": "Indoor Yen Cooler",
            "description": "Space within walking distance from center",
            "dimension": 22,
            "capacity": 2,
            "amount": 1,
            "primaryImage": "https://www.nvrc.ca/sites/default/files/images/Facilities-Fields/maple.jpg",
            "images": [
                "http://cdn.home-designing.com/wp-content/uploads/2016/05/Kitchen-Eating-Space.jpg", 
                "https://www.nvrc.ca/sites/default/files/images/Facilities-Fields/jaycee_house.jpg"
            ],
            "keywords": [
                {
                    "name": "wifi",
                    "icon": "https://image.flaticon.com/icons/png/512/1637/1637453.png"
                },
                {
                   "name": "microphone",
                   "icon": "https://image.flaticon.com/icons/svg/784/784684.svg" 
                }
            ],
            "prices": [
                {
                    "type": "HL",
                    "price": 200,
                    "amount": 1,
                    "time": {
                        "from": "10:00",
                        "till": "22:00"
                    }
                },
                {
                    "type": "DL",
                    "price": 200,
                    "amount": 1,
                    "time": null
                } 
            ]
        }
    });
});

app.patch('/api/space/:id', (req, res) => {
    res.send({
        "success": true,
        "data": {
            "placeid": "199c4998-394a-4c95-89f2-76df97b6af15",
            "id": "199c4998-394a-4c95-89f2-76df97b6af15",
            "name": "Indoor Yen Cooler",
            "description": "Space within walking distance from center",
            "dimension": 22,
            "capacity": 2,
            "amount": 1,
            "primaryImage": "https://www.nvrc.ca/sites/default/files/images/Facilities-Fields/maple.jpg",
            "images": [
                "http://cdn.home-designing.com/wp-content/uploads/2016/05/Kitchen-Eating-Space.jpg", 
                "https://www.nvrc.ca/sites/default/files/images/Facilities-Fields/jaycee_house.jpg"
            ],
            "keywords": [
                {
                    "name": "wifi",
                    "icon": "https://image.flaticon.com/icons/png/512/1637/1637453.png"
                },
                {
                   "name": "microphone",
                   "icon": "https://image.flaticon.com/icons/svg/784/784684.svg" 
                }
            ],
            "prices": [
                {
                    "type": "HL",
                    "price": 200,
                    "amount": 1,
                    "time": {
                        "from": "10:00",
                        "till": "22:00"
                    }
                },
                {
                    "type": "DL",
                    "price": 200,
                    "amount": 1,
                    "time": null
                } 
            ]
        }
    });
});

app.delete('/api/space/:id', (req, res) => {
    res.send({
        "success": true
    });
});

app.listen(PORT);
