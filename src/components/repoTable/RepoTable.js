import { useEffect,useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';

function RepoTable() {
    const [repos, setRepos] = useState([]);

    useEffect(() => {
        fetch("https://api.github.com/users/benngagne/repos")
            .then(res => res.json())
            .then(
                (result) => {
                    setRepos(result)
                }
            )
    }, [])

    return (
        <Table striped bordered hover variant="dark">
            <thead>
                <tr>
                    <th>Repo</th>
                    <th>Description</th>
                    <th>Updated at</th>
                    <th>Created at</th>
                </tr>
            </thead>
            <tbody>
                {repos.map(repo => (
                    <tr>
                        <a href={repo.html_url} target="_blank"><td key={repo.id}>{repo.name}</td></a>
                        <td>{repo.description}</td>
                        <td>{repo.updated_at}</td>
                        <td>{repo.created_at}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
        );
    }
    
    export default RepoTable;
    