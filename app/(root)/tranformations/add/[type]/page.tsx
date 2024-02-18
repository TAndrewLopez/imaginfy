interface AddTransformationTypePageProps {
    params: {
        type: string;
    }
}

const AddTransformationTypePage: React.FC<AddTransformationTypePageProps> = ({ params }) => {
    const { type } = params
    return (
        <div>
            Add Transformation Type Page - {type}
        </div>
    )
}