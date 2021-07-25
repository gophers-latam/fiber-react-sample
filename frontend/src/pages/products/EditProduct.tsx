/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import {SyntheticEvent, useEffect, useRef, useState} from 'react';
import {Redirect} from 'react-router-dom';
import Wrapper from "../../components/Wrapper";
import ImageUpload from "../../components/ImageUpload";

const EditProduct = (props: any) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState(0);
    const [redirect, setRedirect] = useState(false);
    const ref = useRef<HTMLInputElement>(null);

    useEffect(() => {
        (
            async () => {
                const {data} = await axios.get(`get-product/${props.match.params.id}`);

                setTitle(data.title);
                setDescription(data.description);
                setImage(data.image);
                setPrice(data.price);
                console.log(data)
            }
        )();
    }, []);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        let product_id = Number(props.match.params.id);
        const response = await axios.put('update-product', {
            product_id,
            title,
            description,
            image,
            price
        });


        if(response.status===201){
            setRedirect(true)
        }
    }

    const updateImage = (url: string) => {
        if (ref.current) {
            ref.current.value = url;
        }
        setImage(url);
    }    

    if (redirect) {
        return <Redirect to="/products"/>;
    }

    return (
        <Wrapper>
            <form onSubmit={submit}>
                <div className="mb-3">
                    <label>Title</label>
                    <input className="form-control" defaultValue={title} onChange={e => setTitle(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label>Description</label>
                    <textarea className="form-control" defaultValue={description} onChange={e => setDescription(e.target.value)} ></textarea>
                </div>
                <div className="mb-3">
                    <label>Image</label>
                    <div className="input-group">
                        <input className="form-control"
                        ref={ref}
                        defaultValue={image}
                        onChange={e => setImage(e.target.value)}
                        />
                        <ImageUpload uploaded={updateImage}/>
                    </div>
                </div>
                <div className="mb-3">
                    <label>Price</label>
                    <input type="number" className="form-control"
                    value={price}
                    onChange={e => setPrice(Number(e.target.value))}
                    />
                </div>
                <button className="btn btn-outline-secondary">Save</button>
            </form>
        </Wrapper>
    );
};

export default EditProduct;