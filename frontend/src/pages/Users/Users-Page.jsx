import React, {useEffect, useState} from 'react';
import UsersList from "../../components/Users-List/Users-List-Component"
import ErrorModal from '../../Shared/Components/UI-Elements/Modal/ErrorModal';
import LoadingSpinner from '../../Shared/Components/UI-Elements/LoadingSpinner';
import {useHttpClient} from "../../Shared/Hooks/http-hook"
const Users = () => 
{
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [loadedUsers, setLoadedUsers] = useState();

    useEffect(() => {


        const fetchUsers = async () => 
        {
            setIsLoading(true);
            try
            {
                const responseData = await sendRequest('http://localhost:5000/api/users');
                

                setIsLoading(false);
                setLoadedUsers(responseData.users)
            }
            catch(err)
            {
                
                
            }
            
        }

        fetchUsers();


    }, [sendRequest])


    

    return(
        <>
            
            <ErrorModal onClear = {clearError} error = {error}/>
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


