const BASE_URL = '/api/mindfulls';

// Helper function to handle JSON responses and errors
async function handleResponse(response) {
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong');
    }
    return response.json();
}

// Function to delete a mindfull entry by ID
export async function deleteOne(id) {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
    });
    return handleResponse(response);
}

// Function to create a new mindfull entry
export async function create(data) {
    const response = await fetch('/api/mindfulls', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) throw new Error('Failed to create mindfull entry.');
    return response.json();
}

// Function to fetch all mindfull entries for a specific user
export async function mindfullsPerUser(user) {
    const response = await fetch(`${BASE_URL}/user/${user}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
    });
    return handleResponse(response);
}

// Function to update an existing mindfull entry
export async function update(data, id) {
    const response = await fetch(`/api/mindfulls/${id}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) throw new Error('Failed to update mindfull entry.');
    return response.json();
}
