
const ProductsDetail = ({ ApiCall2 }) => {
    const data = ApiCall2
    const { WrappContainer, } = styles;
    return (

        <><div style={WrappContainer}>
            <img src={data.picture} alt="" />
            <span>{data.condition}</span>
            <span>{data.title}</span>
            <h1>$ {data.price.amount}</h1>
            <button>Comprar</button>
        </div>
        <div> {data.description} </div></>
    )
};

const styles = {
    WrappContainer: {
        backgroundColor: '#EEEEEE',
    },
};

export default ProductsDetail;