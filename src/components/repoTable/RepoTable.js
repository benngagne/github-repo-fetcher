import { useEffect,useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';

function RepoTable() {
    const [repos, setRepos] = useState([]);

    // fetch github repo sorted by updated date and store in repos
    useEffect(() => {
        fetch("https://api.github.com/users/benngagne/repos?sort=updated")
            .then(res => res.json())
            .then(
                (result) => {
                    setRepos(result)
                }
            )
    }, [])

    // function to convert ISO8601 to a human readable format
    function isoTimeToHumanTime(isodate) {
        var date = new Date(isodate);
        var year = date.getFullYear();
        var month = date.getMonth()+1;
        var dt = date.getDate();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0' + minutes : minutes;

        if (dt < 10) {
            dt = '0' + dt;
          }
          if (month < 10) {
            month = '0' + month;
          }

        return year + '-' + month + '-' + dt + ' ' + hours + ':' + minutes + ' ' + ampm;
    }

    // update entire repos array dates to human readable format
    var i;
    for(i=0; i < repos.length; i++) {
        repos[i].updated_at = isoTimeToHumanTime(repos[i].updated_at);
        repos[i].created_at = isoTimeToHumanTime(repos[i].updated_at);
    }

    // return in bootstrap table
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
                        <a href={repo.html_url} target="_blank" rel="noreferrer"><td key={repo.id}>{repo.name}</td></a>
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
    