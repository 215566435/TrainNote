const Post = ({ url, jsonData }) => {
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(jsonData),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
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