import { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import { useParams } from "react-router-dom";
import httpClient from "../http/httpClient";
import { MdEdit } from "react-icons/md";
import { useNavigate } from 'react-router-dom'

import { FaDeleteLeft } from "react-icons/fa6";

function DetailPost() {
    const param = useParams();
    const [post, setPost] = useState({});
    const navigate = useNavigate()

    useEffect(() => {

        const fetchData = async () => {
            try {
                const { data } = await httpClient.get(`/api/posts/${param.id}`);
                setPost(data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchData();
    }, [param]);

    const onDelete = async () => {
        try {
            await httpClient.delete(`/api/posts/${param.id}`);
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
        <Container>
            <h1>{post?.title}</h1>
            <p className="edit-btn" onClick={() => navigate('/posts/' + param.id + '/update')}><MdEdit /> Edit</p>
            <p className="edit-btn" onClick={onDelete}><FaDeleteLeft /> Delete</p>
            <h4>{post?.summary}</h4>
            <img src={post?.cover} alt={post?.title} />
            <p>{post?.content}</p>
        </Container>
        </>
    )
}

export default DetailPost;