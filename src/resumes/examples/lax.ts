import { ApplicationPersistentState } from "../../models/v1";

export const laxExample: ApplicationPersistentState = {
    "resume": {
        "version": "1",
        "appearance": {
            "paperSize": "A4",
            "template": "lax",
            "image": "data:image/jpeg;base64,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"
        },
        "personalInformation": {
            "name": "Olivia",
            "surname": "Kim",
            "jobTitle": "Graphic designer",
            "email": "oliviakim@email.com",
            "phone": "555-555-5555",
            "entries": [
                {
                    "name": "LinkedIn",
                    "value": "linkedin.com/in/oliviakim",
                    "id": "ld0jq6ce2gp2s2v13da"
                }
            ]
        },
        "sections": [
            {
                "title": "Education",
                "type": "experience",
                "kind": "education",
                "content": [
                    {
                        "title": "Bachelor of Fine Arts in Design",
                        "subtitle": "Yale University, New Haven, Connecticut",
                        "from": "June 2021",
                        "to": "Present",
                        "description": "- Relevant coursework: Graphic Design, Typography, User Experience Design, Illustration, Color Theory.\n- Proficient in design software such as Adobe Creative Suite (Photoshop, Illustrator, InDesign).\n- Collaborated in group projects and design critiques to enhance design skills and foster teamwork.",
                        "id": "lin8uxltpc3na8kr5nf"
                    }
                ],
                "id": "lcvs2focabpsy8dlzd7"
            },
            {
                "title": "Tools",
                "type": "key value",
                "kind": "skills",
                "content": [
                    {
                        "name": "Photoshop",
                        "value": "",
                        "id": "lin2wbnfbcadlyw29jc"
                    },
                    {
                        "name": "Illustrator",
                        "value": "",
                        "id": "lin2wlgdvjjh89nmrd7"
                    },
                    {
                        "name": "InDesign",
                        "value": "",
                        "id": "lin2wlx80v8r0f3gpr"
                    }
                ],
                "id": "lin2wa08blgsrn0h8l",
            },
            {
                "title": "Languages",
                "type": "key value",
                "kind": "languages",
                "content": [
                    {
                        "name": "English",
                        "value": "Native",
                        "id": "lin30zha7xxltpwdri3"
                    },
                    {
                        "name": "French",
                        "value": "C1",
                        "id": "lin31el2qz9x4l1we18"
                    },
                    {
                        "name": "Italian",
                        "value": "B2",
                        "id": "lin31ja0jt1gvppogrn"
                    }
                ],
                "id": "lin3078mevq5xtq20ik",

            },
            {
                "title": "Experience",
                "type": "experience",
                "kind": "experience",
                "content": [
                    {
                        "title": "Graphic Designer",
                        "subtitle": "Art for All Nonprofit",
                        "from": "May 2022",
                        "to": "Present",
                        "description": "- Created promotional materials including brochures, flyers, and social media graphics.\n- Collaborated with the marketing team to develop visually compelling designs aligned with the organization's mission.\n- Assisted in website updates and maintenance using content management systems (CMS).\n- Contributed to brainstorming sessions and provided creative input on various projects.",
                        "id": "lindfhc0wemic6aw7ds"
                    }
                ],
                "id": "lindfcusnxud3snhzxf",

            },
            {
                "title": "Skills",
                "type": "key value",
                "kind": "skills",
                "content": [
                    {
                        "name": "Aattention to detail",
                        "value": "",
                        "id": "lindmtn98ug6675ni2j"
                    },
                    {
                        "name": "Strong communication skills",
                        "value": "",
                        "id": "lindnutr5sezttx4uvn"
                    },
                    {
                        "name": "Organizational skills",
                        "value": "",
                        "id": "lindmwtzxwbcnx5swgh"
                    }],
                "id": "lindkhuipodhs42ns3r",
            }
        ],
        "legalClause": "I hereby give consent for my personal data included in the application to be processed for the purposes of the recruitment process in accordance with Art. 6 paragraph 1 letter a of the Regulation of the European Parliament and of the Council (EU) 2016/679 of 27 April 2016 on the protection of natural persons with regard to the processing of personal data and on the free movement of such data, and repealing Directive 95/46/EC (General Data Protection Regulation).",
    },
    progress: { sectionsFilled: 0 },

}