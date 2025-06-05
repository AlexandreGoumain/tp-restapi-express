import { useCreateSpot } from '@/hooks';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SpotForm() {
    const navigate = useNavigate();
    const createSpotMutation = useCreateSpot();
    const { mutate: createSpot } = createSpotMutation;
    const isLoading = createSpotMutation.isPending;
    const isError = createSpotMutation.isError;
    const error = createSpotMutation.error;

    const [formData, setFormData] = useState({
        description: '',
        address: '',
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        createSpot(formData, {
            onSuccess: () => {
                navigate('/spots');
            },
        });
    };

    return (
        <div className='max-w-md mx-auto p-6 bg-white rounded-lg shadow-md'>
            <h1 className='text-2xl font-bold mb-6'>Add New Spot</h1>

            {isError && error && (
                <div className='mb-4 p-3 bg-red-100 text-red-700 rounded'>
                    Error:{' '}
                    {error.message ||
                        'An error occurred while creating the spot'}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className='mb-4'>
                    <label
                        htmlFor='address'
                        className='block text-sm font-medium text-gray-700 mb-1'
                    >
                        Address
                    </label>
                    <input
                        type='text'
                        id='address'
                        name='address'
                        value={formData.address}
                        onChange={handleChange}
                        required
                        className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                        placeholder='Enter spot address'
                    />
                </div>

                <div className='mb-4'>
                    <label
                        htmlFor='description'
                        className='block text-sm font-medium text-gray-700 mb-1'
                    >
                        Description
                    </label>
                    <textarea
                        id='description'
                        name='description'
                        value={formData.description}
                        onChange={handleChange}
                        required
                        rows={4}
                        className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                        placeholder='Describe the spot'
                    />
                </div>

                <div className='flex justify-between'>
                    <button
                        type='button'
                        onClick={() => navigate('/spots')}
                        className='px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500'
                    >
                        Cancel
                    </button>

                    <button
                        type='submit'
                        disabled={isLoading}
                        className='px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-300'
                    >
                        {isLoading ? 'Adding...' : 'Add Spot'}
                    </button>
                </div>
            </form>
        </div>
    );
}
