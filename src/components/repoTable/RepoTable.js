import { useEffect,useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import { format, formatDistanceToNow, parseISO } from 'date-fns';

function RepoTable() {
    // init state variables
    const [repos, setRepos] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);
    
    // fetch github repo sorted by updated date and store in repos
    useEffect(() => {
        fetch("https://api.github.com/users/benngagne/repos?sort=updated")
        .then(res => res.json())
        .then(
            (result) => {
                setRepos(result);
                setIsLoaded(true);
            },
            
            (error) => {
                setError(error);
                setIsLoaded(true);
            }
            )
        }, [])
        
        // format dates with date-fns when repos state is changed (fetched)
        useEffect(() => {
            if(repos) {
                var i;
                for(i=0;i<repos.length;i++) {
                    repos[i].updated_at = String(formatDistanceToNow(parseISO(repos[i].updated_at))); 
                    repos[i].created_at = String(format(parseISO(repos[i].created_at), "yyyy-MM-dd")); 
                }
            }
        }, [repos])
        
        
        // return in bootstrap table
        if (error) {
            return <h1>error...</h1>;
        } else if (!isLoaded) {
            return <h1>loading...</h1>;
        } else {
            return (
                <Table striped bordered hover variant="dark">
                <thead>
                <tr>
                <th>Repo</th>
                <th>Description</th>
                <th>Updated</th>
                <th>Created</th>
                </tr>
                </thead>
                <tbody>
                {repos.map(repo => (
                    <tr key={repo.id}>
                    <td><a href={repo.html_url} target="_blank" rel="noopener noreferrer">{repo.name}</a></td>
                    <td>{repo.description}</td>
                    <td>{repo.updated_at}</td>
                    <td>{repo.created_at}</td>
                    </tr>
                    ))}
                    </tbody>
                    </Table>
                    );
                }
            }
            export default RepoTable;