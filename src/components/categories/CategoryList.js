import React, { useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { confirmAlert } from "react-confirm-alert"


export const CategoryList = () => {
    const [categories, updateCategories] = useState([])
    const history = useHistory()


    useEffect(
        () => {
            fetch ("http://localhost:8088/categories")
            .then(response => response.json())
            .then((Categories) => {
                updateCategories(Categories)
            })
        },
        []
    )

    const deleteCategory = (id) => {
        fetch(`http://localhost:8088/categories/${id}`, {
            method: "DELETE"
        })
            .then(() => {
                fetch ("http://localhost:8088/categories")
                .then(res => res.json())
                .then((categories) => {
                    updateCategories(categories)
                })
            })
    }

    const confirmDelete = (id) => {
        confirmAlert({
            message: 'Are you sure you want to DELETE this category?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => { deleteCategory(id) }
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
                <button className="createCategory" onClick={() => history.push("/categories/create")}>Create Category</button>
            </div>

            <h4>Category List</h4>
            {
                categories.map(
                    (category) => {
                        return <div key={category.id}><div className="categories__list">
                            <section>
                                <div className="item__categoryList">{category.label}</div>
                            </section>
                        </div>
                        <button color="primary" onClick={() => {
                            confirmDelete(category.id)
                        }}>Delete</button>
                        </div>
                    } 
                )
            }
        </>
    )
}