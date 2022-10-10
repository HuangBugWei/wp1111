## state description
> allListNum, leftNum and completed seem similar
    however, if we want to complete advanced functions
    we need to define it seperately
   * allListNum => whether footer is visible or not
   * leftNum => tracking and show in footer
   * comletedNum => whether Clear completed button is visible or not
   * last, buttonState is for tracking which button is pressed and which lis should be showed

## components description
> I split it with 3 main components: Header, Section and Footer
* Header: with title
* Section: organize the li add, num estimation and event control.
* Footer: button is set here, filter function is mainly control which li element can show with different button statement.