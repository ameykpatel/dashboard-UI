import * as ActionTypes from './actionTypes';

export const addComment = (dishId, rating, author, comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    }
});

export const addSoundFile = (name, image, description) => ({
    type: ActionTypes.ADD_SOUND_FILE,
    payload: {
        name: name,
        image: image,
        description: description
    }
});

export const removeSoundFile = (id) => ({
    type: ActionTypes.REMOVE_SOUND_FILE,
    payload: {
        id: id
    }
});