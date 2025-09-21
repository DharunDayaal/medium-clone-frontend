import EditPostModule from '@/components/Modules/EditPostModule'
import { getAllTags } from '@/services/postService';
import React from 'react'

const EditPostPage = async () => {

    let tagsArray;
    
        try {
            const response = await getAllTags();
            if (response?.success) {
                tagsArray = response.data;
            }
        } catch (error) {
            console.log("Error on getting all tags", error);
        }

  return (
    <>
        <EditPostModule tags={tagsArray} />
    </>
  )
}

export default EditPostPage