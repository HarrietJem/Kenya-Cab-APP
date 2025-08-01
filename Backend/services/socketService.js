module.exports = function socketHandlers(io, socket) {
  // Ride Events
  socket.on('rideRequested', (data) => {
    io.to(`driver_${data.driverId}`).emit('newRideRequest', data);
  });

  socket.on('rideAccepted', (data) => {
    io.to(`rider_${data.riderId}`).emit('rideStatusUpdate', {
      status: 'accepted',
      ...data
    });
  });

  // Join room for specific updates
  socket.on('joinRoom', (room) => {
    socket.join(room);
  });
};