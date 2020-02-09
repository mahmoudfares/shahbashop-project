export const options = {
    container: "top-left",
      animationIn: ["animated", "flipInX"],
      animationOut: ["animated", "fadeOut"],
      dismiss: {
        showIcon: true,
        duration: 3000,
        onScreen: true,
        click: true,
        touch: true,
      },
      slidingExit: {
        duration: 10,
        timingFunction: 'fadeOut',
        delay: 0
      }
}