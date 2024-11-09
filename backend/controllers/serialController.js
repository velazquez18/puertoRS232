import { SerialPort } from "serialport";
import { ReadlineParser } from "@serialport/parser-readline";

export const serialController = (io) => {
  const port = new SerialPort({
    path: "COM4",
    baudRate: 9600,
  });

  const parser = port.pipe(new ReadlineParser({ delimiter: "\r\n" }));

  port.on("open", () => {
    console.log("Puerto COM4 abierto");
  });

  io.on("connection", (socket) => {
    parser.on("data", (data) => {
      console.log(`Datos recibidos en COM4: ${data}`);
      socket.on("serialData", (data) => {
        io.emit("serialData", data);
      });
    });
    console.log("conected succesfully");
    socket.on("disconnect", () => {
      console.log("user disconected");
    });
  });

  port.on("error", (err) => {
    console.error(`Error en COM4: ${err.message}`);
  });

  // verificar que se leen los datos
  port.on("readable", () => {
    const data = port.read();
    console.log(`Datos recibidos: ${data}`);
  });
};
