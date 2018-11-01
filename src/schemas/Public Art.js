let data = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "$id": "https://github.com/OpendataDeveloperNetwork/oden-schemas/blob/master/schemas/Public%20Art.json",
    "title": "Public Art",
    "type": "array",
    "items": {
        "type": "object",
        "properties": {
            "TitleOfWork": {
                "type": "string",
                "example": "Pump House Mural"
            },
            "Latitude": {
                "type": "number",
                "minimum": -90,
                "maximum": 90
            },
            "Longitude": {
                "type": "number",
                "minimum": -180,
                "maximum": 180
            },
            "Description": {
                "description": "The description for a piece of public art",
                "type": "string"
            },
            "ArtType": {
                "description": "The type of art, eg painting, sculpture",
                "type": "string"
            },
            "Dimensions": {
                "description": "Physical dimensions of the public art pieces",
                "type": "string"
            },
            "Medium": {
                "description": "The art medium used for the art piece",
                "type": "string"
            },
            "InstallDate": {
                "description": "The date the public art piece was installed",
                "type": "string",
                "format": "date-time"
            },
            "StreetAddress": {
                "type": "string",
                "example": "123 West Rd"
            },
            "Unit": {
                "type": "string",
                "example": "Unit 500"
            },
            "City": {
                "type": "string",
                "example": "New Westminster"
            },
            "Province": {
                "type": "string",
                "example": "BC"
            },
            "PostalCode": {
                "type": "string",
                "example": "5V6 3E8"
            },
            "PhoneNumber": {
                "type": "integer",
                "pattern": "^[0-9]+$",
                "example": 1234567891
            },
            "Description": {
                "type": "string",
                "example": "\"Puzzled,\" (2013) by artist Steve Hornung brightens the side of an otherwise drab pump house. The mural features a boy with a slingshot, three moose, and interlocking puzzle pieces."
            },
            "SiteName": {
                "description": "The name of the site where the public art piece is located",
                "type": "string"
            },
            "Status": {
                "description": "Status of the public art piece",
                "type": "string",
                "example": "In place"
            },
            "Ownership": {
                "description": "The owner of the public art piece",
                "type": "string"
            },
            "Images": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "URL": {
                            "type": "string",
                            "example": "https://www.toronto.ca/wp-content/uploads/2017/08/9602-bergeron2.jpg"
                        },
                        "photoCredit": {
                            "type": "string",
                        }
                    }
                }
            },
            "Artist": {
                "type": "object",
                "properties": {
                    "FirstName": {
                        "description": "The artist's first name.",
                        "type": "string"
                    },
                    "LastName": {
                        "description": "The artist's last name.",
                        "type": "string"
                    },
                    "Country": {
                        "description": "The artist's country of residence.",
                        "type": "string"
                    },
                    "Email": {
                        "description": "The artist's email address.",
                        "type": "string",
                        "pattern": "^@$"
                    },
                    "Website": {
                        "description": "The URL for the artist's website.",
                        "type": "string"
                    }
                }
            }
        },
        "required": [
            "TitleOfWork",
            "Latitude",
            "Longitude"
        ]
    }
}

export default data;
