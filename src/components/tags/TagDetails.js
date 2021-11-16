import React, { useEffect, useState } from "react"
import { useParams, useHistory, Link } from "react-router-dom"


export const TagDetails = () => {
    const [tag, updateTag] = useState({})
    const [tagList, syncTagList] = useState([])
    const { id } = useParams()
    const history = useHistory()

    useEffect(
        () => {
            fetch(`http://localhost:8000/tags`, {
                headers: {
                    "Authorization": `Token ${localStorage.getItem("token")}`
                }
            })
                .then(res => res.json())
                .then(syncTagList)
        },
        []
    )

    useEffect(
        () => {
             fetch(`http://localhost:8000/tags/${id}`, {
                 headers: {
                     "Authorization": `Token ${localStorage.getItem("token")}`
                 }
             })
                .then(response => response.json())
                .then((data) => {
                    updateTag(data)
                })
        },
        [id]
    )


        const ReturnHome = () => {
            return <button className="button__return">
                <Link to="/tags">Return to Posts List</Link>
            </button>
        }

    return (
        <>
            <h1 className="tag__header">Tag Details</h1>
            <section className="tag__details">
                <h3 className="tag__heading">{tag.label}</h3>
                <div className="button__return"><ReturnHome /></div>
            </section>
        </>
    )

}