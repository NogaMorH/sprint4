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
            "imgUrl": "https://cdn.pixabay.com/photo/2017/06/13/12/53/profile-2398782_1280.png"
        },
        {
            "_id": "u102",
            "fullname": "Noga Mor-Havilio",
            "imgUrl": "https://cdn.pixabay.com/photo/2017/06/13/12/53/profile-2398782_1280.png"
        },
        {
            "_id": "u103",
            "fullname": "Rebecca Krukover",
            "imgUrl": "https://cdn.pixabay.com/photo/2017/06/13/12/53/profile-2398782_1280.png"
        },
        {
            "_id": "u104",
            "fullname": "Elon B",
            "imgUrl": "https://cdn.pixabay.com/photo/2017/06/13/12/53/profile-2398782_1280.png"
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
                            "url": "https://trello.com/1/cards/632603fbf6acc8003771698a/attachments/632604094ac46301cd75ec3c/download/600b72f9-react-1024x680.png",
                            "isCover": true
                        },
                        {
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
                    "dueDate": 1663840800000,
                    "description": ""
                },
                {
                    "id": "t103",
                    "title": "Demo 3",
                    "dueDate": 1664439300000,
                    "description": ""
                }
            ]
        },
        {
            "id": "g102",
            "title": "Finish by 4pm",
            "style": {},
            "byMember": {
                "id": "u103",
                "fullname": "Rebecca Krukover",
                "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
            },
            "tasks": [
                {
                    "id": "t104",
                    "title": "Create Trello diagram",
                    "dueDate": 1663160400000,
                    "description": "",
                    "labelIds": ["l101", "l103"],
                    "memberIds": ["u101", "u102", "u103"],
                },
                {
                    "id": "t105",
                    "title": "Create demo data in JSON",
                    "dueDate": 1663160400000,
                    "description": "",
                    "labelIds": ["l101", "l103"],
                    "memberIds": ["u101", "u102", "u103"],
                }
            ]
        },
        {
            "id": "g103",
            "title": "Design",
            "style": {},
            "byMember": {
                "id": "u103",
                "fullname": "Rebecca Krukover",
                "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
            },
            "tasks": [
                {
                    "id": "t106",
                    "title": "Css tricks",
                    "description": "",
                    "attachments": [
                        {
                            "url": "https://css-tricks.com/",
                            "isCover": false
                        }
                    ],
                    "labelIds": ["l104"],
                },
                {
                    "id": "t107",
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
                }
            ]
        },
        {
            "id": "g104",
            "title": "Backlog - client",
            "style": {},
            "byMember": {
                "id": "u103",
                "fullname": "Rebecca Krukover",
                "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
            },
            "tasks": [
                {
                    "id": "t108",
                    "title": "Create components",
                    "description": "",
                    "labelIds": ["l104"],
                    "memberIds": ["u101", "u102", "u103"],
                    "attachments": [{ "url": "https://css-tricks.com/", "isCover": false }],
                    "checklists": [
                        {
                            "id": "YEhwF",
                            "title": "Home",
                            "todos": [
                                {
                                    "id": "212j2",
                                    "title": "Header",
                                    "isDone": false
                                },
                                {
                                    "id": "212f2",
                                    "title": "home-links",
                                    "isDone": false
                                },
                                {
                                    "id": "212d2",
                                    "title": "demonstration",
                                    "isDone": false
                                },
                                {
                                    "id": "212b2",
                                    "title": "footer",
                                    "isDone": false
                                }
                            ]
                        },
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
                                    "isDone": false
                                },
                                {
                                    "id": "212b3",
                                    "title": "group preview",
                                    "isDone": false
                                },
                                {
                                    "id": "212s3",
                                    "title": "task list",
                                    "isDone": false
                                },
                                {
                                    "id": "212o3",
                                    "title": "task preview",
                                    "isDone": false
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
                            "id": "YEhvF",
                            "title": "Login/Signup",
                            "todos": [
                                {
                                    "id": "212j4",
                                    "title": "login",
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
                        }
                    ]
                }
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
