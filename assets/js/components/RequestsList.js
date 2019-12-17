import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import API from "../core/api";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../actions/user.actions";
import { membershipActions } from "../actions/membership.actions";

import EntryMessageDialog from "./EntryMessageDialog";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  IconButton
} from "@material-ui/core";

export default function RequestsList() {
  const requests = useSelector(state => state.users.requests);
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(membershipActions.getAll());
  //   dispatch(userActions.getAll());
  // }, []);
  function openInNewTab(url) {
    var win = window.open(url, "_blank");
    win.focus();
  }
  function deleteReqeust(id) {
    dispatch(userActions.delete(id));
  }
  function approveRequest(id) {
    dispatch(membershipActions.assign(id));
  }
  return (
    <div>
      <Table style={{ width: "100%" }}>
        <TableHead>
          <TableRow>
            <TableCell>Vardas Pavardė</TableCell>
            <TableCell>El. Paštas </TableCell>
            <TableCell>Telefono Nr.</TableCell>
            <TableCell>LinkedIn </TableCell>
            <TableCell>Portfolio</TableCell>
            <TableCell>Žinutė</TableCell>

            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {requests.map(request => (
            <TableRow key={request.id}>
              <TableCell component="th" scope="row">
                {request.name} {request.surname}
              </TableCell>
              <TableCell>{request.email}</TableCell>
              <TableCell>{request.mobilePhone}</TableCell>
              <TableCell>
                <a href="#" onClick={() => openInNewTab(request.linkedin)}>
                  {request.linkedin}
                </a>
              </TableCell>
              <TableCell>
                <a href="#" onClick={() => openInNewTab(request.url)}>
                  {request.url}
                </a>
              </TableCell>

              <TableCell>
                <EntryMessageDialog message={request.entryText} />
              </TableCell>
              <TableCell>
                <IconButton
                  onClick={() => approveRequest(request.id)}
                  aria-label="approve"
                >
                  <CheckCircleOutlineIcon style={{ color: "green" }} />
                </IconButton>
                <IconButton
                  onClick={() => deleteReqeust(request.id)}
                  aria-label="delete"
                >
                  <DeleteIcon color="secondary" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
