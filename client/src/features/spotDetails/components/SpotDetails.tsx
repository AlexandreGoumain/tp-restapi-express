import { useGetSpots } from '@/hooks';
import { formatDate } from '@/utils';
import { useParams } from 'react-router-dom';

type SpotDetailsProps = {
    address: string;
    description: string;
    createdAt: string;
    modifiedAt: string;
    user: {
        id: string;
        username: string;
    };
    id: string;
};

export default function SpotDetails() {
    const { id } = useParams();
    const { data, isLoading, isError, error } = useGetSpots();

    const spot: SpotDetailsProps | undefined = data?.data.find(
        spot => spot.id === id
    );

    console.log(spot);

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (isError) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <h1>SpotDetails - id - {id}</h1>
            <p>Address: {spot?.address}</p>
            <p>Description: {spot?.description}</p>
            <p>CreatedAt: {formatDate(spot?.createdAt)}</p>
            <p>ModifiedAt: {formatDate(spot?.modifiedAt)}</p>
            <p>User: {spot?.user.username}</p>
        </div>
    );
}
