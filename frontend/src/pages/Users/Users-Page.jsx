import React, {useEffect, useState} from 'react';
import UsersList from "../../components/Users-List/Users-List-Component"
import ErrorModal from '../../Shared/Components/UI-Elements/Modal/ErrorModal';
import LoadingSpinner from '../../Shared/Components/UI-Elements/LoadingSpinner';

const Users = () => 
{
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [loadedUsers, setLoadedUsers] = useState();

    useEffect(() => {

        const sendRequest = async () => 
        {
            setIsLoading(true);
            try
            {
                const response = await fetch('http://localhost:5000/api/users');
                const responseData = await response.json();

                if(!response.ok)
                {
                    throw new Error(responseData.message)
                }

                setIsLoading(false);
                setLoadedUsers(responseData.users)
            }
            catch(err)
            {
                setIsLoading(false);
                setError(err.message);
                
            }
            
        }

        sendRequest();


    }, [])


    const errorHandler = () => 
    {
        setError(null);
    }

    return(
        <>
            
            <ErrorModal onClear = {errorHandler} error = {error}/>
            {
                isLoading && (
                    <div className = "center">
                        <LoadingSpinner />
                    </div>
                )
            }
            {!isLoading && loadedUsers && <UsersList items = {loadedUsers}/>}
        </>



    )
}

export default Users;


