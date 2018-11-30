let data = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "https://github.com/OpendataDeveloperNetwork/oden-schemas/blob/master/schemas/Public%20Art.json",
  "title": "Public Art",
  "type": "array",
  "items": {
    "type": "object",
    "geometry": {
      "type": {
        "type": "String",
        "example": "LineString",
        "description": "This indicates that the public art is located at a geological point. It can be Point, LineString, MultiLineString"
      },
      "coordinates": {
        "items": {
          "type": "float",
          "example": 49.222
        },
        "type": "array",
        "example": [
          [
            49.222,
            -122.222
          ]
        ]
      }
    },
    "properties": {
      "titleOfWork": {
        "type": "string",
        "example": "Pump House Mural"
      },
      "latitude": {
        "type": "number",
        "minimum": -90,
        "maximum": 90
      },
      "longitude": {
        "type": "number",
        "minimum": -180,
        "maximum": 180
      },
      "details": {
        "type": "object",
        "properties": {
          "description": {
            "description": "The description for a piece of public art",
            "type": "string"
          },
          "type": {
            "description": "The type of art, eg painting, sculpture",
            "type": "string"
          },
          "dimensions": {
            "description": "Physical dimensions of the public art pieces",
            "type": "string"
          },
          "medium": {
            "description": "The art medium used for the art piece",
            "type": "string"
          },
          "installDate": {
            "description": "The date the public art piece was installed",
            "type": "string",
            "format": "date-time"
          },
          "status": {
            "description": "Status of the public art piece",
            "type": "string",
            "example": "In place"
          },
          "ownership": {
            "description": "The owner of the public art piece",
            "type": "string"
          }
        }
      },
      "location": {
        "type": "object",
        "properties": {
          "address": {
            "type": "object",
            "properties": {
              "streetAddress": {
                "type": "string",
                "example": "123 West Rd"
              },
              "unit": {
                "type": "string",
                "example": "Unit 500"
              }
            }
          },
          "city": {
            "type": "string",
            "example": "New Westminster"
          },
          "province": {
            "type": "string",
            "example": "BC"
          },
          "postalCode": {
            "type": "string",
            "example": "5V6 3E8"
          },
          "siteName": {
            "description": "The name of the site where the public art piece is located",
            "type": "string"
          }
        }
      },
      "phoneNumber": {
        "type": "string",
        "pattern": "^(\\([0-9]{3}\\))?[0-9]{3}-[0-9]{4}$",
        "example": "555-1212"
      },
      "images": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "imageURL": {
              "type": "string",
              "example": "https://www.toronto.ca/wp-content/uploads/2017/08/9602-bergeron2.jpg",
              "format": "uri-reference"
            },
            "photoCredit": {
              "type": "string"
            }
          }
        }
      },
      "artist": {
        "type": "object",
        "properties": {
          "firstName": {
            "description": "The artist's first name.",
            "type": "string"
          },
          "lastName": {
            "description": "The artist's last name.",
            "type": "string"
          },
          "country": {
            "description": "The artist's country of residence.",
            "type": "string"
          },
          "email": {
            "description": "The artist's email address.",
            "type": "string",
            "format": "email"
          },
          "website": {
            "description": "The URL for the artist's website.",
            "type": "string",
            "format": "uri-reference"
          },
          "bio": {
            "description": "This artist's bio.",
            "type": "string"
          }
        }
      }
    },
    "required": [
      "titleOfWork",
      "latitude",
      "longitude"
    ]
  }
}

export default data;
