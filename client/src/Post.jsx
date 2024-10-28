import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Post = () => {
    const [posts, setPosts] = useState([]);
    const [newPostContent, setNewPostContent] = useState('');
    const [displayPost, setDisplayPost] = useState('');
    const [replyContent, setReplyContent] = useState({}); // Store replies per post
    const [searchTerm, setSearchTerm] = useState('');

    const fetchPosts = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/posts');
            setPosts(response.data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    const handlePostSubmit = async (e) => {
        e.preventDefault();
        if (!newPostContent) return;

        try {
            await axios.post('http://localhost:3001/api/posts', { content: newPostContent });
            setNewPostContent('');
            fetchPosts(); // Refresh the posts
            setDisplayPost(newPostContent); // Display the new post content
        } catch (error) {
            console.error("Error creating post:", error);
        }
    };

    const handleLike = async (postId) => {
        try {
            await axios.patch(`http://localhost:3001/api/posts/${postId}/like`);
            fetchPosts(); // Refresh the posts
        } catch (error) {
            console.error('Error liking post:', error);
        }
    };

    const handleDislike = async (postId) => {
        try {
            await axios.patch(`http://localhost:3001/api/posts/${postId}/dislike`);
            fetchPosts(); // Refresh the posts
        } catch (error) {
            console.error('Error disliking post:', error);
        }
    };

    const handleDelete = async (postId) => {
        try {
            await axios.delete(`http://localhost:3001/api/posts/${postId}`);
            fetchPosts(); // Refresh the posts
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    const handleReplySubmit = async (postId) => {
        if (!replyContent[postId]) return;

        try {
            await axios.post(`http://localhost:3001/api/posts/${postId}/replies`, { content: replyContent[postId] });
            setReplyContent({ ...replyContent, [postId]: '' }); // Clear reply input
            fetchPosts(); // Refresh the posts
        } catch (error) {
            console.error("Error creating reply:", error);
        }
    };

    const filteredPosts = posts.filter(post => 
        post.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '1rem', background: 'white', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}>
            <h1 style={{ marginBottom: '1rem' }}>Share Your Thoughts</h1>
            <form onSubmit={handlePostSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <textarea
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    placeholder="Write your thoughts..."
                    required
                    style={{ resize: 'none', height: '100px', padding: '0.5rem', border: '1px solid #ced4da', borderRadius: '4px' }}
                />
                <button type="submit" style={{ padding: '0.5rem 1rem', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', transition: 'background-color 0.3s' }}>
                    Post
                </button>
            </form>

            {displayPost && (
                <div style={{ marginTop: '1rem', padding: '1rem', background: '#e9ecef', borderRadius: '5px' }}>
                    <p>{displayPost}</p>
                </div>
            )}

            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search posts..."
                style={{ padding: '0.5rem', border: '1px solid #ced4da', borderRadius: '4px', marginTop: '1rem', width: '100%' }}
            />

            <div>
                {filteredPosts.map((post) => (
                    <div key={post._id} style={{ padding: '1rem', margin: '1rem 0', background: '#e9ecef', borderRadius: '5px' }}>
                        <p>{post.content}</p>
                        <div>
                            <button onClick={() => handleLike(post._id)}>Like ({post.likes})</button>
                            <button onClick={() => handleDislike(post._id)}>Dislike ({post.dislikes})</button>
                            <button onClick={() => handleDelete(post._id)}>Delete</button>
                        </div>
                        <form onSubmit={(e) => { e.preventDefault(); handleReplySubmit(post._id); }} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem' }}>
                            <input
                                type="text"
                                value={replyContent[post._id] || ''}
                                onChange={(e) => setReplyContent({ ...replyContent, [post._id]: e.target.value })}
                                placeholder="Reply..."
                                required
                                style={{ padding: '0.5rem', border: '1px solid #ced4da', borderRadius: '4px' }}
                            />
                            <button type="submit" style={{ padding: '0.5rem 1rem', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', transition: 'background-color 0.3s' }}>
                                Reply
                            </button>
                        </form>
                        <div style={{ marginTop: '1rem' }}>
                            {post.replies && post.replies.map(reply => (
                                <div key={reply._id} style={{ padding: '0.5rem', margin: '0.5rem 0', background: '#f8f9fa', borderRadius: '4px' }}>
                                    <div>
    <h6>{reply.content}</h6>
</div>

                                </div>
                            ))}
                        </div>
                    </div>
                    
                ))}
            </div>
        </div>
    );
};

export default Post;
