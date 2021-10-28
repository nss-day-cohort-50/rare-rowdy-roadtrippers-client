import React, { useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"


export const TagsList = () => {
    const [tags, updateTags] = useState([])
    const history = useHistory()


    useEffect(
        () => {
            fetch ("http://localhost:8088/tags")
            .then(response => response.json())
            .then((Tags) => {
                updateTags(Tags)
            })
        },
        []
    )

    const deleteTag = (id) => {
        fetch(`http://localhost:8088/tags/${id}`, {
            method: "DELETE"
        })
            .then(() => {
                fetch ("http://localhost:8088/posts")
                .then(res => res.json())
                .then((tags) => {
                    updateTags(tags)
                })
            })
    }

    return (
        <>
            <div>
                <button className="createTag" onClick={() => history.push("/tags/create")}>Create Tag</button>
            </div>

            <h4>Tag List</h4>
            {
                tags.map(
                    (tag) => {
                        return <div key={tag.id} className="tags__list">
                            <section>
                                <div className="item__tagList">{tag.label}</div>
                            </section>
                        </div>
                    }
                ).sort()
            }
        </>
    )
}