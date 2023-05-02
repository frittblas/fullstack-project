import React, { useState, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useStates } from 'react-easier';
import { getPrograms } from '../../services/api';
import './ProgramsDropdown.css';

export default function ProgramsDropdown() {

  const state = useStates('main');
  const [programsList, setProgramsList] = useState([]);

  useEffect(() => {

    async function fetchProgramList() {
      try {
        const result = await getPrograms();
        setProgramsList(result);
        console.log("program-list: ", programsList);
      } catch (error) {
        console.error(error);
      }
    }

    fetchProgramList();

  }, []);

  return (
    <Form.Group className="programs-select" onChange={event => { state.adminProgramSelected = event.target.value; }}>
      <span>Programs:</span>
      <Form.Select>
        <option key="all" value="All">All</option>
        {programsList.map(p => <option key={p._id} value={p.programTitle}>{p.programTitle}</option>)}
      </Form.Select>
    </Form.Group>
  );
}