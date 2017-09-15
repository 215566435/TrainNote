const Post = ({ url, jsonData }) => {
    console.log(jsonData)
    return fetch(url, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(jsonData),
        redirect: 'follow',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    })
}

const Delete = ({ url, id }) => {
    return fetch(url, {
        method: 'DELETE',
        body: JSON.stringify({ id: id }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
}

export default {
    Post: Post,
    Delete: Delete
}