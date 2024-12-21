import Container from "react-bootstrap/esm/Container";
import Post from "../components/Post";
import httpClient from "../http/httpClient";
import { useEffect, useState } from "react";

function Home() {

    const [posts, setPosts] = useState([]);

    useEffect(() => {

        const fetchPosts = async () => {
            try {
                const { data } = await httpClient.get('/api/posts');
                setPosts(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchPosts()

    }, []);


    return (
        <div>
            <Container>
                {posts && posts.length > 0 && posts.map(post => {
                    return (
                        <Post
                            key={post._id}
                            id={post._id}
                            title={post.title}
                            summary={post.summary}
                            cover={post.cover}
                            createdAt={new Date(post.createdAt).toDateString()}
                        />
                    )
                })}
            </Container>
        </div>
    );
}

export default Home;