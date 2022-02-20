import React, { useEffect, useState } from "react";

function CreateForm ({functionRef}) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        functionRef.current = setVisible
    }, [functionRef]);

    if (!visible) return null;

    return <form>
        <label>Name</label>
        <input />
    </form>;
}

export default CreateForm;