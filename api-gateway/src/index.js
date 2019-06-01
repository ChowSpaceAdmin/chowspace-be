const app = require('./server/app');
const config = require('./server/config');

app.get('/api/place', (req, res) => {
    res.send({
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
    });
});

app.listen(config.PORT);
