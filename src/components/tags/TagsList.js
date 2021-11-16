import React, { useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { confirmAlert } from "react-confirm-alert"


export const TagsList = () => {
    const [tags, updateTags] = useState([])
    const history = useHistory()


    useEffect(
        () => {
            fetch("http://localhost:8000/tags", {
                headers: {
                    "Authorization": `Token ${localStorage.getItem("token")}`
                }
            })
                .then(response => response.json())
                .then((Tags) => {
                    updateTags(Tags)
                })
        },
        []
    )

    const deleteTag = (id) => {
        fetch(`http://localhost:8088/tags/${id}`, {
            method: "DELETE",
            "Authorization": `Token ${localStorage.getItem("token")}`
        })
            .then(() => {
                fetch("http://localhost:8000/tags")
                    .then(res => res.json())
                    .then((tags) => {
                        updateTags(tags)
                    })
            })
    }

    const confirmDelete = (id) => {
        confirmAlert({
            message: 'Are you sure you want to DELETE this request?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => { deleteTag(id) }
                },
                {
                    label: 'No',
                    onClick: () => alert('Click No')
                }
            ]
        })

    };
    

    return (
        <>
            <div>
                <button className="createTag" onClick={() => history.push("/tags/create")}>Create Tag</button>
            </div>

            <h4>Tag List</h4>
            <form>

                {
                    tags.map(
                        (tag) => {
                            return <><div key={tag.id} className="tags__list">
                                <fieldset>
                                    <label htmlFor="item__tagList">{tag.label}</label>
                                    <input
                                        type="checkbox"
                                        id="item__tagList"
                                        className="item__tagList"/>
                                </fieldset>
                            </div>
                                <button color="primary" onClick={() => {
                                    confirmDelete(tag.id)
                                }}>Delete</button>
                            </>
                        }
                    ).sort()
                }
            </form>
        </>
    )
}