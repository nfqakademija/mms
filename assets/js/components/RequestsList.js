import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import API from "../core/api";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../actions/user.actions";
import { request } from "http";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Chip,
  IconButton
} from "@material-ui/core";

export default function RequestsList() {
  const [state, setState] = React.useState({
    requests: [
      {
        id: "1",

        name: "Rokas",
        surname: "Kliucinskas",
        email: "rokas@pastas.lt",
        phone: "86000000",
        linkedin: "https://www.linkedin.com/",
        portfolio: "https://www.linkedin.com/",
        requestText: `What is Lorem Ipsum
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
        files: [
          {
            name: "ManoCV.pdf",
            url: "..."
          },
          {
            name: "Portfolio.pdf",
            url: "..."
          }
        ]
      },
      {
        id: "2",

        name: "Petras",
        surname: "Petraitis",
        email: "petras@pastas.lt",
        phone: "86000000",
        linkedin: "https://www.linkedin.com/",
        portfolio: "https://www.linkedin.com/",
        requestText: `Why do we use it?
        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).`,
        files: [
          {
            name: "ManoCV.pdf",
            url: "..."
          },
          {
            name: "Portfolio.pdf",
            url: "..."
          }
        ]
      },
      {
        id: "3",
        name: "Jonas",
        surname: "Jonaitis",
        email: "jonas@pastas.lt",
        phone: "86000000",
        linkedin: "https://www.linkedin.com/",
        portfolio: "https://www.linkedin.com/",
        requestText: `Where can I get some? DUNNO`,
        files: [
          {
            name: "ManoCV.pdf",
            url: "..."
          },
          {
            name: "Portfolio.pdf",
            url: "..."
          }
        ]
      }
    ]
  });

  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(membershipActions.getAll());
  //   dispatch(userActions.getAll());
  // }, []);

  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Vardas Pavardė</TableCell>
            <TableCell>El. Paštas </TableCell>
            <TableCell>Telefono Nr.</TableCell>
            <TableCell>LinkedIn </TableCell>
            <TableCell>Portfolio</TableCell>
            <TableCell>Failai</TableCell>
            <TableCell>Žinutė</TableCell>

            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {state.requests.map(request => (
            <TableRow key={request.id}>
              <TableCell component="th" scope="row">
                {request.name} {request.surname}
              </TableCell>
              <TableCell>{request.email}</TableCell>
              <TableCell>{request.phone}</TableCell>
              <TableCell>
                <a href={request.linkedin}>{request.linkedin}</a>
              </TableCell>
              <TableCell>
                <a href={request.portfolio}>{request.portfolio}</a>
              </TableCell>
              <TableCell>
                {request.files.map(file => (
                  <Chip
                    style={{ margin: "5px" }}
                    key={file.name}
                    label={file.name}
                  />
                ))}
              </TableCell>
              <TableCell>{request.requestText}</TableCell>
              <TableCell>
                <IconButton aria-label="delete">
                  <DeleteIcon color="secondary" />
                </IconButton>
                <IconButton aria-label="approve">
                  <CheckCircleOutlineIcon style={{ color: "green" }} />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
