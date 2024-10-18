import { useEffect, useState } from "react";

interface ITaskModel {
    id: string,
    description: string,
    createdDate: string
}

function Tasks() {

    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState('');
    const [btnText, setBtnText] = useState('Add Task');
    const [id, setId] = useState('');
    const [error, setError] = useState(false);
    const baseUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        await fetch(baseUrl)
            .then(response => response.json())
            .then((data) => {
                setTasks(data["data"]);
                return data;
            })
            .catch(error => {
                console.log(error);
            });
    }

    const parseDate = (date: string) => {
        return new Date(date).toDateString();
    }

    const handleAddUpdateTask = async () => {

        if (task != '' && task != undefined) {
            const model = {
                id: id,
                description: task
            };
            
            if(id != ''){
                handleUpdate(model as ITaskModel);
            }
            else {
                handleAdd(model as ITaskModel);
            }
        }
        else {
            setError(true);
        }
    }

    const handleAdd = async (model: ITaskModel) => {
        await fetch(baseUrl,
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(model)
            })
            .then((response) => { return response.json() })
            .then(data => {
                console.log(data);
                alert(data['message']);
                setBtnText('Add Task');
                setId('');
                setTask('');
                fetchData();
            })
            .catch(error => {
                console.log(error);
            });
    }

    const handleUpdate = async (model: ITaskModel) => {
        await fetch(`${baseUrl}/${id}`,
            {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(model)
            })
            .then((response) => { return response.json() })
            .then(data => {
                console.log(data);
                alert(data['message']);
                setBtnText('Add Task');
                setId('');
                setTask('');
                fetchData();
            })
            .catch(error => {
                console.log(error);
            });
    }

    const handleClick = (item: any) => {
        setTask(item['description']);
        setError(false);

        if (item['_id']) {
            setId(item['_id']);
            setBtnText('Update Task');
        } else {
            setId(item['']);
            setBtnText('Add Task');
        }
    }

    const handleTextChange = (event: any) => {
        setTask(event.target.value);

        if (task.length > 3) {
            setError(false);
        }
    }

    const handleDelete = async (id: string) => {
        if (confirm("Do you want to delete this task?")) {
            await fetch(`${baseUrl}/${id}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                })
                .then((response) => { return response.json() })
                .then(data => {
                    alert(data['message']);
                    fetchData();
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    return (
        <>
            <div className="container">
                <div className="container-block">
                    <div className="wrapper">
                        <input type="text" value={task} onChange={handleTextChange} />
                        <button className="btn" onClick={handleAddUpdateTask}>{btnText}</button>
                    </div>
                    <div className={error ? 'show' : 'hide'}>
                        <p className="error">Description feild is required</p>
                    </div>
                </div>

                <table className="rwd-table">
                    <tbody>
                        <th>#</th>
                        <th>Description</th>
                        <th>Date</th>
                        <th>Action</th>
                    </tbody>
                    <tbody>

                        {
                            tasks && tasks.map((item, index) => {
                                return (
                                    <tr key={'task_' + index}>
                                        <td>{index + 1}</td>
                                        <td>{item['description']}</td>
                                        <td>{parseDate(item['createdAt'])}</td>
                                        <td>
                                            <button onClick={() => handleClick(item)}>Edit</button>
                                            <button onClick={() => handleDelete(item['_id'])}>Delete</button>
                                        </td>
                                    </tr>)
                            })
                        }
                    </tbody>
                </table>
            </div>

        </>
    )
}

export default Tasks