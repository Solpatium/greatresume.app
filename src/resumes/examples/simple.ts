import { ApplicationPersistentState } from "../../models/v1";

export const simpleExample: ApplicationPersistentState = {
    "resume": {
        "version": "1",
        "appearance": {
            "paperSize": "A4",
            "template": "simple",
            "image": "data:image/jpeg;base64,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"
        },
        "personalInformation": {
            "name": "Isabella",
            "surname": "Steel",
            "jobTitle": "Nurse",
            "email": "isabellasteel@email.com",
            "phone": "555-555-5555",
            "links": []
        },
        "sections": [
            {
                "title": "Profile",
                "section": {
                    "type": "text",
                    "kind": "text",
                    "content": "Compassionate and experienced nurse with a proven track record of delivering high-quality patient care. Seeking a challenging position in a reputable healthcare facility where I can utilize my expertise, clinical skills, and strong commitment to patient well-being."
                },
                "id": "linefruqhyaf60iexuv",
                "filled": true
            },
            {
                "title": "Employment",
                "section": {
                    "type": "experience",
                    "kind": "employment",
                    "content": [
                        {
                            "title": "Senior Registered Nurse",
                            "subtitle": "Hospital Name, City, State",
                            "from": "August 2021",
                            "to": "Present",
                            "description": "",
                            "url": "",
                            "id": "line8kjyyw2o8kuff6"
                        },
                        {
                            "title": "Charge Nurse",
                            "subtitle": "Nursing Facility Name, City, State",
                            "from": "October 2000",
                            "to": "July 2021",
                            "description": "",
                            "url": "",
                            "id": "line96f2bfblesf8jmv"
                        }
                    ],
                    "id": "line8eingnz4egum04f"
                },
                "id": "line8einfr5szhsp7hv",
                "filled": true
            },
            {
                "title": "Education",
                "section": {
                    "type": "experience",
                    "kind": "education",
                    "content": [
                        {
                            "title": "Bachelor of Science in Nursing (BSN)",
                            "subtitle": "ABC University, City, State",
                            "from": "October 1996",
                            "to": "June 2000",
                            "description": "",
                            "url": "",
                            "id": "linedlujms073gr663"
                        }
                    ],
                    "id": "linebrz734e2873jyt3"
                },
                "id": "linebrz7g7pkcbnxetj",
                "filled": true
            },
            {
                "title": "References",
                "section": {
                    "type": "text",
                    "kind": "text",
                    "content": "Available upon request.\n\n"
                },
                "id": "lineosffyqln7qcaerq",
                "filled": true
            },
            {
                "title": "Certifications",
                "section": {
                    "type": "experience",
                    "kind": "experience",
                    "content": [
                        {
                            "title": "Registered Nurse",
                            "subtitle": "",
                            "from": "",
                            "to": "",
                            "description": "",
                            "url": "",
                            "id": "linel9anlv12sb55f7l"
                        },
                        {
                            "title": "Basic Life Support",
                            "subtitle": "",
                            "from": "",
                            "to": "",
                            "description": "",
                            "url": "",
                            "id": "linelp7ktphzfpo63zr"
                        },
                        {
                            "title": "Advanced Cardiac Life Support ",
                            "subtitle": "",
                            "from": "",
                            "to": "",
                            "description": "",
                            "url": "",
                            "id": "linem35hro3qccp6d7"
                        }
                    ],
                    "id": "linel7wvjlfcd0sgppl"
                },
                "id": "linel7wvvhugpxdimzk",
                "filled": true
            }
        ],
        "legalClause": "I hereby give consent for my personal data included in the application to be processed for the purposes of the recruitment process in accordance with Art. 6 paragraph 1 letter a of the Regulation of the European Parliament and of the Council (EU) 2016/679 of 27 April 2016 on the protection of natural persons with regard to the processing of personal data and on the free movement of such data, and repealing Directive 95/46/EC (General Data Protection Regulation).",
        "filledPersonalInformation": true,
        "filledAppearance": true,
        "filledSections": true
    }
}