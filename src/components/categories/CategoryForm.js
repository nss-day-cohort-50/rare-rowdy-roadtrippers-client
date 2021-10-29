import React, { useState } from "react"
import { useHistory } from "react-router-dom"


export const CategoryForm = () => {
    const [category, updateCategory] = useState({
        label: ""
    })

    const history = useHistory()

    const submitCategory = (event) => {
        event.preventDefault()
        const newCategory = {
            label: category.label,
        }

        const fetchOption = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newCategory)
        }

        return fetch("http://localhost:8088/categories", fetchOption)
            .then(() => {
                history.push("/categories")
            })
    };

    return (
        <form className="category__form">
            <div className="categoryForm">
                <h2>Create a Category</h2>
                <fieldset>
                    <div className="category-group">
                        <label htmlFor="title">Label:</label>
                        <input
                            onChange={
                                (event) => {
                                    const copy = { ...category }
                                    copy.label = event.target.value
                                    updateCategory(copy)
                                }
                            }
                            id="label"
                            name="label"
                            type="text"
                            className="label"
                            placeholder="Enter Label Here"/>
                    </div>
                </fieldset>

                <button className="button__submit" onClick={submitCategory}>
                    Submit Category
                </button>
            </div>
        </form>
    )

}
