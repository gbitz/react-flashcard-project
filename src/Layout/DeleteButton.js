import React from "react";
import {deleteDeck, deleteCard} from "../utils/api/index"
import {useHistory} from "react-router-dom";

function DeleteButton({itemToDelete, type}) {
    const history = useHistory();
    const deleteHandler = async () => {
        if (type ==="deck") {
            if (window.confirm("Are you certain you want to Delete this deck?")) {
                try {
                    await deleteDeck(itemToDelete.id);
                    console.log("Deck Deleted...");
                    history.push("/")
                    window.location.reload();
                } catch (error) {
                    console.log("Deck Deletion Error... ", error);
                }
            }

        } else if (type==="card") {
            if (window.confirm("Are you certain you want to Delete this card?")) {
                try {
                    await deleteCard(itemToDelete.id);
                    console.log("Card Deleted...");
                } catch (error) {
                    console.log("Card Deletion Error... ", error);
                }
                window.location.reload();
            }
        }
    }

    return (
        <button type="button" className="btn btn-danger" onClick={deleteHandler}>
            Delete
        </button>
    )
}

export default DeleteButton;