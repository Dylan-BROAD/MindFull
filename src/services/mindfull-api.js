const BASE_URL = '/api/mindfulls';


export async function deleteOne(id) {
    return await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE'
    })
}

export async function create(title, journal, goals, songName, moodRating, email) {
    const result = await fetch(BASE_URL,
        {
            method: 'POST', body: JSON.stringify({
                title, journal, goals, songName, moodRating, email
            }), headers: {
                "content-type": "application/json"
            }
        })
    return result

}

export async function mindfullsPerUser(user) {
    const res = await fetch(`${BASE_URL}/user/${user}`)
    const data = await res.json()
    return data

}

export async function update(title, journal, goals, songName, moodRating, email, id) {
    const result = await fetch(`${BASE_URL}/${id}`, {
        method: 'PUT', body: JSON.stringify({
            title, journal, goals, songName, moodRating, email
        }), headers: { "content-type": "application/json" }
    })

    return result
}