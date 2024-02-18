interface TransformationPageIDProps {
    params: {
        id: string;
    };
}

const TransformationPageID: React.FC<TransformationPageIDProps> = ({
    params,
}) => {
    const { id } = params;
    return <div>Transformation Page - {id}</div>;
};

export default TransformationPageID