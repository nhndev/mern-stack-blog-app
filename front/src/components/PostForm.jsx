import { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Spinner from 'react-bootstrap/Spinner';
import httpClient from "../http/httpClient";
import { useNavigate, useParams } from 'react-router-dom'
import { Editor } from '@tinymce/tinymce-react';
 
function PostForm() {
    const param = useParams();

    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [cover, setCover] = useState('');

    const navigate = useNavigate()

    useEffect(() => {

        const fetchData = async (id) => {
            try {
                const { data } = await httpClient.get(`/api/posts/${id}`);
                setTitle(data?.title);
                setSummary(data?.summary);
                setContent(data?.content);
            } catch (error) {
                console.error(error);
            }
        }
        if (param?.id && !title) {
            fetchData(param.id);
        }
    }, [param, title]);


    const onSave = async () => {
        try {
            setLoading(true);
            const request = new FormData();
            request.append('title', title);
            request.append('summary', summary);
            request.append('content', content);
            request.append('cover', cover);

            if (param?.id) {
                await httpClient.put(`/api/posts/${param.id}`, request, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                navigate('/');
                return;
            }

            await httpClient.post('/api/posts', request, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            navigate('/');
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <Container>
                <h1>Add new post</h1>
                {loading && <Spinner animation="border" />}
                <Row>
                    <div className="col-12">
                        <input type="text" className="form-control" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                </Row>
                <Row className="mt-3">
                    <div className="col-12">
                        <textarea className="form-control" placeholder="Summary" value={summary} onChange={(e) => setSummary(e.target.value)} />
                    </div>
                </Row>
                <Row className="mt-3">
                    <div className="col-12">
                        <Editor
                            apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
                            value={content}
                            onEditorChange={(newValue) => setContent(newValue)}
                        />
                    </div>
                </Row>
                <Row className="mt-3">
                    <div className="col-12">
                        <input type="file" className="form-control" placeholder="Cover" accept="image/*" onChange={(e) => setCover(e?.target?.files[0])} />
                    </div>
                </Row>
                <button onClick={onSave} disabled={loading} className="btn btn-primary mt-3">Save</button>
            </Container>
        </div>
    )
}

export default PostForm;