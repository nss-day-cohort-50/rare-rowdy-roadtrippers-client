import React, { useState } from "react"
import { useHistory } from "react-router-dom"


export const TagForm = () => {
    const [tag, updateTag] = useState({
        label: ""
    })

    const history = useHistory()

    const createTag = (event) => {
        event.preventDefault()
        const newTag = {
            label: tag.label
        }

        const fetchOption = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newTag)
        }

        return fetch("http://localhost:8088/tags", fetchOption)
            .then(() => {
                history.push("/tags")
            })
    };

    return (
        <form className="tag__form">
            <div className="tagForm">
                <h2>Create a Tag</h2>
                <fieldset>
                    <div className="tag-group">
                        <label htmlFor="name">Name:</label>
                        <input
                            onChange={
                                (event) => {
                                    const copy = { ...tag }
                                    copy.label = event.target.value
                                    updateTag(copy)
                                }
                            }
                            id="tag__name"
                            name="tag__name"
                            type="text"
                            className="tag__name"
                            placeholder="Enter Tag Name Here"/>
                    </div>
                </fieldset>

                <button className="button__submit" onClick={createTag}>
                    Create Tag
                </button>
            </div>
        </form>
    )

}
