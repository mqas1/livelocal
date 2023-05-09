# LiveLocal

[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description

Live music is slowly starting to get back into full swing after that forced hibernation that we will not speak of again... 

Yet for all the advances in web and native applications, there isn't a current competitor to word of mouth when it comes to the DIY world of local music scenes. Existing social media is an extension of this.  

This application was built with a view to creating a space for local artists to advertise their upcoming concerts and for music fans to find these shows. With the needs of artist and fans first and foremost in mind.

![screenshot of events page](/assets/images/eventsScreenshot.jpeg)

[Deployed app](https://livelocal.herokuapp.com/).
  
## Table of Contents
  
- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)
- [Contributing](#contributing)
  
## Installation
  
Run the following command, ```npm i```, to install the required packages.

## Usage

![Screenshot of artists page](/assets/images/artistsScreenshot.jpeg)
  
The user runs the command ```npm run start``` while located in the 'server' folder, or ```npm run develop``` in the main folder. Do this after installing the packages as per the above section. 

The user will then be able to access the Apollo Server and test out the GraphQL API, while much of the front-end development is still in production.

## Credits

Codebase by Morgan Qasabian. One of the upcoming features will be the ability to filter events based on location data. Implementing custom GraphQL scalars for GeoJSON was made intelligible with reference to a few tutorials online, in particular [these](https://brygrill.medium.com/creating-a-geojson-featurecollection-type-for-graphql-352591451b4a) [two](https://dev.to/trackmystories/how-to-geojson-with-apollo-graphql-server-27ij).
  
## License
This application is covered under the [MIT License](https://opensource.org/licenses/MIT):
        
        Copyright 2023 mqas1

        Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
        
        The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
        
        THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
         
## Contributing
  
The guidelines for contributing to this application can be found at the [Contributor Covenant](https://www.contributor-covenant.org/).

---

## Areas of Future Development

- Finish the development of the client side in line with the functionality that is promised with the back-end currently in the source code
- Namely, user ability to create pages for artists and create events for them. Other users having the ability to find these events and register their intention to attend, or purchase tickets for them
- Stripe integration
- Further expansion of the comment feature (in the back-end, not front-end yet) to not be just on events.
  
*This README was made with ❤️ by the [README Generator](https://github.com/mqas1/readme-generator)*