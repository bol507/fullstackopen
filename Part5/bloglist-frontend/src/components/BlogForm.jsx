import React, { useState } from "react";

import './BlogForm.css'
import Button from './atoms/Button';
import InputGroup from './atoms/InputGroup';



const BlogForm = ({ CreateBlog }) => {
    const [titleValue, setTitleValue] = useState('')
    const [authorValue, setAuthorValue] = useState('')
    const [urlValue, setUrlValue] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault();
        CreateBlog ( {
            title: titleValue,
            author: authorValue,
            url: urlValue
          })
        //handleCreateBlog(titleValue, authorValue, urlValue)
        setTitleValue('')
        setAuthorValue('')
        setUrlValue('')
    }//handleSubmit

    return (
        <div className="wrapper">
            <div className="form-wrapper create-blog">

                <form onSubmit={handleSubmit}>
                    <h2>Create a New Blog</h2>
                    <InputGroup
                        label="Title"
                        value={titleValue}
                        onChange={(event) => setTitleValue(event.target.value)}
                    />
                    <InputGroup
                        label="Author"
                        value={authorValue}
                        onChange={(event) => setAuthorValue(event.target.value)}
                    />
                    <InputGroup
                        label="Url"
                        value={urlValue}
                        onChange={(event) => setUrlValue(event.target.value)}
                    />

                    <Button type={"submit"} msg={"Create Blog"} />
                </form>
            </div>

        </div>
    )//return
}

export default BlogForm