// Guidelines
// boardStore (no need for groupStore, taskStore), boardService
// *. Support saving the entire board and also on the task level, 

//    (no need for seperate APIs for mini-updates of task parts like members or status)
// *. No need for saving an activities array per task, those activities are easily filtered from the board activities

// *. activites - when board is updated, the frontend does not send the activities array within the board 
//    instead it only sends a new activity object: {txt, boardId, groupId, taskId}
//    the backend adds this activity to the board with $push and can also emit socket notificatios

// *. D & D Guidelines - vue-smooth-dnd / vuedraggable / react-beutiful-dnd
// *. Same model for Monday style app (do not implement a generic columns feature)
// *. We do not handle concurrent editing - needs versioning

// Rendering performance:
// Store Mutation - saveBoard
// state.board = board
// Later, support switching a specific task


// <BoardDetails> => <BoardGroup v-for / map>
// <BoardGroup> => <TaskPreview v-for / map>
// <TaskDetails> (supports edit) - initially can be loaded in seperate route 
// (later on we can place it in a modal and nested route)

// Component
// const activity = {
//     "id": utilService.makeId(),
//     "txt": "Changed Color",
//     "createdAt": Date.now(),
//     "byMember": userService.getLoggedinUser(),
//     "task": "task"
// }

// // Store - saveTask
// function storeSaveTask(task, activity) {

//     board = boardService.saveTask(boardId, groupId, task, activity)
//     commit(board)
// }

// boardService
// function saveTask(boardId, groupId, task, activity) {
//     const board = getById(boardId)
//     // PUT /api/board/b123/task/t678

//     // TODO: find the task, and update
//     board.activities.unshift(activity)
//     saveBoard(board)
//     // return board
//     // return task
// }

export const gBoards = [{
    "_id": "b101",
    "title": "Trello-Sprint 4",
    "isStarred": false,
    // "archivedAt": null,
    "createdBy": {
        "_id": "u101",
        "fullname": "Kfir Azulay",
        "imgUrl": "http://some-img"
    },
    // "style": { "background-image": "url(https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.w3schools.com%2Fcss%2Fimg_lights.jpg&imgrefurl=https%3A%2F%2Fwww.w3schools.com%2Fcss%2Fcss3_images.asp&tbnid=kwgHAQqTiLQXLM&vet=12ahUKEwjW5p2J0ZT6AhULgc4BHa10Ac0QMygEegUIARDHAQ..i&docid=2bZLA8JdC6ZaTM&w=600&h=400&itg=1&q=image&ved=2ahUKEwjW5p2J0ZT6AhULgc4BHa10Ac0QMygEegUIARDHAQ)" },
    "labels": [
        {
            "id": "l101",
            "title": "Work in progress",
            "color": "#F5DD29"
        },
        {
            "id": "l102",
            "title": "One more step",
            "color": "#FFAF3F"
        },
        {
            "id": "l103",
            "title": "Priority",
            "color": "#EF7564"
        },
        {
            "id": "l104",
            "title": "Extra",
            "color": "#CD8DE5"
        },
        {
            "id": "l105",
            "title": "Trello Tip",
            "color": "#29CCE5"
        },
        {
            "id": "l106",
            "title": "Help",
            "color": "#6DECA9"
        }
    ],
    "members": [
        {
            "_id": "u101",
            "fullname": "Kfir Azulay",
            "imgUrl": "https://ca.slack-edge.com/T03E3RZ2KHV-U03MSPLUC8M-929ea4d5d183-512"
        },
        {
            "_id": "u102",
            "fullname": "Noga Mor-Havilio",
            "imgUrl": "https://ca.slack-edge.com/T03E3RZ2KHV-U03JXQHCYRL-ee953b265b68-512"
        },
        {
            "_id": "u103",
            "fullname": "Rebecca Krukover",
            "imgUrl": "https://ca.slack-edge.com/T03E3RZ2KHV-U03EVLADE85-e21f1b8ed5f9-512"
        },
        {
            "_id": "u104",
            "fullname": "Elon B",
            "imgUrl": "https://ca.slack-edge.com/T03E3RZ2KHV-U03M2Q9P2AH-e3749e4ebe43-512"
        }
    ],
    "groups": [
        {
            "id": "g101",
            "title": "Demos",
            "createdAt": 1663156800000,
            "style": { "color": "#EF7564" },
            "byMember": {
                "id": "u103",
                "fullname": "Rebecca Krukover",
                "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
            },
            "tasks": [
                {
                    "id": "t101",
                    "title": "Demo 1",
                    "dueDate": 1663480800000,
                    // "isDone": false,
                    "memberIds": ["u101", "u102", "u103"],
                    "attachments": [
                        {
                            "name": "React",
                            "url": "https://trello.com/1/cards/632603fbf6acc8003771698a/attachments/632604094ac46301cd75ec3c/download/600b72f9-react-1024x680.png",
                            "isCover": true
                        },

                        {
                            "name": "Attachment",
                            "url": "https://css-tricks.com/",
                            "isCover": false
                        }
                    ],
                    "description": "Demo Meeting with Asaf and Yaron. \nDon't forget to come in a good mood 😎",
                    "checklists": [
                        {
                            "id": "YEhmF",
                            "title": "Tasks",
                            "todos": [
                                {
                                    "id": "212jX",
                                    "title": "Home",
                                    "isDone": false
                                },
                                {
                                    "id": "212fX",
                                    "title": "UI Design",
                                    "isDone": false
                                },
                                {
                                    "id": "212dX",
                                    "title": "JSON data",
                                    "isDone": true
                                },
                                {
                                    "id": "212bX",
                                    "title": "CRUDL",
                                    "isDone": false
                                },
                                {
                                    "id": "212cX",
                                    "title": "Basic Board - members/attachments",
                                    "isDone": false
                                },
                                {
                                    "id": "212yX",
                                    "title": "Templates",
                                    "isDone": false
                                }
                            ]
                        },
                        {
                            "id": "YEhdF",
                            "title": "Good Vibes😎",
                            "todos": [
                                {
                                    "id": "212js",
                                    "title": "no stress",
                                    "isDone": false
                                },
                                {
                                    "id": "212hs",
                                    "title": "confidence",
                                    "isDone": false
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": "t102",
                    "title": "Demo 2",
                    "dueDate": 1663777374329,
                    "description": ""
                },
                {
                    "id": "t103",
                    "title": "Demo 3",
                    "dueDate": 1663777374329,
                    "description": ""
                }
            ]
        },
        {
            "id": "g102",
            "title": "Design",
            "style": {},
            "byMember": {
                "id": "u103",
                "fullname": "Rebecca Krukover",
                "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
            },
            "tasks": [
                {
                    "id": "t104",
                    "title": "Add task labels",
                    "dueDate": 1663797374329,
                    "description": "",
                    "labelIds": ["l101", "l103"],
                    "memberIds": ["u102", "u103"],
                    "checklists": [

                        {
                            "id": "YEhmF",
                            "title": "React beautiful dnd",
                            "todos": [
                                {
                                    "id": "212j3",
                                    "title": "Create labels modal in task details component",
                                    "isDone": false
                                },
                                {
                                    "id": "212f3",
                                    "title": "Create labels modal in task edit modal component",
                                    "isDone": false
                                },
                                {
                                    "id": "212d3",
                                    "title": "Write functionality",
                                    "isDone": false
                                },
        
                            ]
                        },
                        
        
                    ],
                },
                {
                    "id": "t105",
                    "title": "Design scrollbar ideas",
                    "dueDate": 1663877374329,
                    "description": "Ask Asi about padding",
                    "labelIds": ["l101", "l103"],
                    "memberIds": ["u102"],
                    "attachments": [
                        {
                            "name": "CSS-Tricks",
                            "url": "https://trello.com/1/cards/6321e397f74c90017a203d85/attachments/6321e41bf0df2d02221d6a73/download/image.png",
                            "isCover": true
                        },
                        {
                            "name": "W3Schools",
                            "url": "https://www.w3schools.com/howto/howto_css_custom_scrollbar.asp",
                            "isCover": false
                        }
                    ],
                },
                {
                    "id": "t106",
                    "title": "Design board side menu",
                    "dueDate": 1663777374329,
                    "description": "",
                    "labelIds": ["l101", "l103"],
                    "memberIds": ["u101"],
                },
                {
                    "id": "t107",
                    "title": "Implement check lists design",
                    "dueDate": 1663900250120,
                    "description": "fix the functionality",
                    "labelIds": ["l101", "l103"],
                    "memberIds": [ "u103"],
                },
                {
                    "id": "t108",
                    "title": "Fix login page design",
                    "dueDate": 1663900250120,
                    "description": "",
                    "labelIds": ["l101"],
                    "memberIds": ["u101"],
                },

            ]
        },
        {
            "id": "g103",
            "title": "In Progress",
            "style": {},
            "byMember": {
                "id": "u103",
                "fullname": "Rebecca Krukover",
                "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
            },
            "tasks": [
                {
                    "id": "t109",
                    "title": "Create demo data in JSON",
                    "description": "",
                    "attachments": [
                        {
                            "name": "Attachment",
                            "url": "https://css-tricks.com/",
                            "isCover": false
                        }
                    ],
                    "labelIds": ["l104"],
                },
                {
                    "id": "t110",
                    "title": "Fix check list functionality in Task details component",
                    "description": "At the moment, the input is updated every time you type, and we need to change it to only update the information when user is click save.",
                    "labelIds": ["l101"],
                    "memberIds": ["u101"],
                    "comments": [
                        {
                            "id": "ZdPnm",
                            "txt": "How's it going @kfirazulay ? don't forget to add labeling colors smile",
                            "createdAt": 1663176600000,
                            "byMember": {
                                "id": "u101",
                                "fullname": "Rebecca Krukover",
                                "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                            }
                        }
                    ]
                },
                {
                    "id": "111",
                    "title": "Build components",
                    "description": "",
                    "attachments":[],
                    "checklists": [

                        {
                            "id": "YEhmF",
                            "title": "Board",
                            "todos": [
                                {
                                    "id": "212j3",
                                    "title": "board-header",
                                    "isDone": false
                                },
                                {
                                    "id": "212f3",
                                    "title": "sidebar",
                                    "isDone": false
                                },
                                {
                                    "id": "212d3",
                                    "title": "grout-list",
                                    "isDone": true
                                },
                                {
                                    "id": "212b3",
                                    "title": "group preview",
                                    "isDone": true
                                },
                                {
                                    "id": "212s3",
                                    "title": "task list",
                                    "isDone": true
                                },
                                {
                                    "id": "212o3",
                                    "title": "task preview",
                                    "isDone": true
                                },
                                {
                                    "id": "212l3",
                                    "title": "task details",
                                    "isDone": false
                                },
                                {
                                    "id": "212w3",
                                    "title": "filter",
                                    "isDone": false
                                }
                            ]
                        },

                        {
                            "id": "YEhdF",
                            "title": "User Profile",
                            "todos": [
                                {
                                    "id": "212j4",
                                    "title": "Header(navbar)",
                                    "isDone": false
                                },
                                {
                                    "id": "212f4",
                                    "title": "edit-details",
                                    "isDone": false
                                },
                                {
                                    "id": "212d4",
                                    "title": "hero",
                                    "isDone": false
                                }
                            ]
                        },
                        {
                            "id": "YEhsF",
                            "title": "Templates",
                            "todos": [
                                {
                                    "id": "212j5",
                                    "title": "template-list",
                                    "isDone": false
                                },
                                {
                                    "id": "212f5",
                                    "title": "template-preview",
                                    "isDone": false
                                }
                            ]
                        },

                    ],
                    "labelIds": ["l104"],
                },
                {
                    "id": "t105",
                    "title": "Set up backend server",
                    "dueDate": 1663800250120,
                    "description": "Ask Asi about padding",
                    "labelIds": ["l101", "l103"],
                    "memberIds": ["u102"],
                    "attachments": [
                        {
                            "name": "CSS-Tricks",
                            "url": "https://www.duocircle.com/wp-content/uploads/2020/08/private-smtp-server.jpg",
                            "isCover": true
                        },
                        {
                            "name": "mongoDB docs",
                            "url": "https://www.mongodb.com/docs/",
                            "isCover": false
                        }
                    ],
                },
                
            ]
        },
        {
            "id": "g104",
            "title": "Bugs",
            "style": {},
            "byMember": {
                "id": "u103",
                "fullname": "Rebecca Krukover",
                "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
            },
            "tasks": [
                {
                    "id": "t112",
                    "title": "",
                    "labelIds": ["l101", "l103"],
                    "attachments": [
                        {
                            "name": "Attachment",
                            "url": "https://www.beningo.com/wp-content/uploads/2016/03/AdobeStock_100096286.jpeg",
                            "isCover": true
                        },
                        {
                            "name": "Attachment",
                            "url": "https://opensource.com/sites/default/files/lead-images/bug_software_issue_tracking_computer_screen.jpg",
                            "isCover": false
                        }
                    ],
                },
                {
                    "id": "t113",
                    "title": "No cursor in header serach field on mac",
                    "description": "No cursor appears in search field Open TrelloType something in the search field in the top left corner Expected: Cursor should appear Actual: No cursor appears, so it's impossible to select or copy text from this field. ",
                    "labelIds": ["l104"],
                    "memberIds": ["u101"],

                },
                {
                    "id": "t114",
                    "title": "Mobile web calendar doesn't show any cards",
                    "description": "If you view the calendar in the phone's browser (I tested on an iPhone), it shows a calendar, but no indication of what dates have cards associated with them, and clicking on a date you know has a card doesn't show anything. Could we hide this link beneath a certain screen width?",
                    "labelIds": ["l104"],
                    "memberIds": ["u101"],
                    "attachments": [{ "name": "Attachment", "url": "https://css-tricks.com/", "isCover": false }],

                },
                {
                    "id": "t115",
                    "title": "Mobile web calendar doesn't show any cards",
                    "description": "Screenshot in the attached case.",
                    "labelIds": ["l104"],
                    "memberIds": ["u101"],
                    "attachments": [{ "name": "Attachment", "url": "https://secure.helpscout.net/fakeconversation/12345", "isCover": false }],

                }
            ]
        },
        {
            "id": "g105",
            "title": "Done",
            "style": {},
            "byMember": {
                "id": "u103",
                "fullname": "Rebecca Krukover",
                "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
            },
            "tasks": [
                {
                    "id": "t116",
                    "title": "Color Palette variables",
                    "description": "",
                    "labelIds": ["l101"],
                    "memberIds": ["u101"],
                    "comments": [
                        {
                            "id": "ZdPnm",
                            "txt": "How's it going @kfirazulay ? don't forget to add labeling colors smile",
                            "createdAt": 1663176600000,
                            "byMember": {
                                "id": "u101",
                                "fullname": "Rebecca Krukover",
                                "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                            }
                        }
                    ]
                },
                {
                    "id": "t117",
                    "title": "React beautiful dnd",
                    "description": "",
                    "labelIds": ["l101"],
                    "attachments": [{ "name": "React beautiful dnd", "url": "https://github.com/atlassian/react-beautiful-dnd", "isCover": false }],
            "checklists": [

                {
                    "id": "YEhmF",
                    "title": "React beautiful dnd",
                    "todos": [
                        {
                            "id": "212j3",
                            "title": "Get to know the library",
                            "isDone": true
                        },
                        {
                            "id": "212f3",
                            "title": "Watch tutorial",
                            "isDone": true
                        },
                        {
                            "id": "212d3",
                            "title": "Implement the feature in group list component",
                            "isDone": true
                        },

                    ]
                },
                

            ],
            "labelIds": ["l104"],
        },
        {
            "id": "t118",
            "title": "Defining the application's layout",
            "description": "",
            "labelIds": ["l101"],
            "memberIds": ["u102"],
            "comments": [
                {
                    "id": "ZdPnm",
                    "txt": "",
                    "createdAt": 1663176600000,
                    "byMember": {
                        "id": "u101",
                        "fullname": "Rebecca Krukover",
                        "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                    }
                }
            ]
        },
    ]
}
],
"activities": [
    {
        "id": "a101",
        "txt": "Changed Color",
        "createdAt": 154514,
        "byMember": {
            "id": "u103",
            "fullname": "Rebecca Krukover",
            "imgUrl": "http://some-img"
        },
        "task": {
            "id": "c101",
            "title": "Demo 1"
        }
    },
    {
        "id": "a102",
        "txt": "Task Created",
        "createdAt": 154514,
        "byMember": {
            "id": "u103",
            "fullname": "Rebecca Krukover",
            "imgUrl": "http://some-img"
        },
        "task": {
            "id": "c102",
            "title": "Demo 2"
        }
    },
    {
        "id": "a103",
        "txt": "Task Created",
        "createdAt": 154514,
        "byMember": {
            "id": "u101",
            "fullname": "Rebecca Krukover",
            "imgUrl": "http://some-img"
        },
        "task": {
            "id": "c103",
            "title": "Demo 3"
        }
    },
    {
        "id": "a104",
        "txt": "Task Created",
        "createdAt": 154514,
        "byMember": {
            "id": "u101",
            "fullname": "Rebecca Krukover",
            "imgUrl": "http://some-img"
        },
        "task": {
            "id": "c103",
            "title": "Demo 3"
        }
    }
]
}]
const user = {
    "_id": "u101",
    "fullname": "Abi Abambi",
    "username": "abi@ababmi.com",
    "password": "aBambi123",
    "imgUrl": "http://some-img.jpg",
    "mentions": [{
        "id": "m101",
        "boardId": "m101",
        "taskId": "t101"
    }]
}

// For Monday Mostly:
// Dynamic Components:
// <TaskPreview> => <tr>
//    <td v-for="(cmpType) in cmpsOrder">
//         <component :is="cmpType" :info="getCmpInfo(cmpType)" @updated="updateTask(cmpType, $event)">
//    </td>
// </tr>

// function updateTask(cmpType, data) {
//     // Switch
//     // task.members = data;
//     // task.status = data;

//     // dispatch to store: updateTask(task, activity)
// }


// const cmp1 = {
//     type: 'status-picker',
//     info: {
//         selectedStatus: 'pending',
//         statuses: [{}, {}]
//     }
// }

// const cmp2 = {
//     type: 'member-picker',
//     info: {
//         selectedMembers: ['m1', 'm2'],
//         members: ['m1', 'm2', 'm3']
//     }
// }

// const cmp3 = {
//     type: 'date-picker',
//     info: {
//         selectedDate: '2022-09-07',
//     }
// }


// export function TaskPreview({ task }) {
//     //GET FROM STORE
//     const cmpsOrder = [
//       "status-picker",
//       "member-picker",
//       "date-picker",
//       "priority-picker",
//     ];
//     return (
//       <section>
//         <h5>{task.txt}</h5>
//         {cmpsOrder.map((cmp, idx) => {
//           return (
//             <DynamicCmp
//               cmp={cmp}
//               key={idx}
//               onUpdate={(data) => {
//                 console.log("Updating: ", cmp, "with data:", data);
//                 // make a copy, update the task
//                 // Call action: updateTask(task)
//               }}
//             />
//           );
//         })}
//       </section>
//     );
//   }

// export function DynamicCmp({ cmp, info, onUpdate }) {
//     switch (cmp) {
//         case "status-picker":
//             return <StatusCmp info={info} onUpdate={onUpdate} />;
//         case "member-picker":
//             return <MemberPicker info={info} onUpdate={onUpdate} />;
//         default:
//             return <p>UNKNOWN {cmp}</p>;
//     }
// }
