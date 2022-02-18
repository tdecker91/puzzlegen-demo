import React, { RefObject } from "react";
import { PNG, PNGVisualizerOptions, Type } from "sr-puzzlegen";
import { Subject, interval } from "rxjs";
import { debounce } from "rxjs/operators";

export type PuzzleGenProps = {
  type: Type,
  options?: PNGVisualizerOptions
}

class PuzzleGenPNG extends React.Component<PuzzleGenProps> {

  private puzzleRef: RefObject<HTMLDivElement>;
  private render$ = new Subject();

  constructor(props: PuzzleGenProps) {
    super(props);
    this.puzzleRef = React.createRef();

    // If props are updated too quickly we end up with multiple
    // images in the dom. Debounce render events to prevent this
    this.render$
      .pipe(debounce(() => interval(100)))
      .subscribe(() => {
        this.renderPNG();
      });
  }

  private renderPNG() {
    this.removeRender();
    this.puzzleRef.current && PNG(this.puzzleRef.current, this.props.type, this.props.options);
  }

  private removeRender() {
    while (this.puzzleRef.current && this.puzzleRef.current.firstChild) {
      this.puzzleRef.current.removeChild(this.puzzleRef.current.firstChild);
    }
  }

  componentDidMount() {
    if (this.puzzleRef.current) {
      this.render$.next();
    }
  }

  componentDidUpdate(prevProps: any) {
    const prevOptions = JSON.stringify(prevProps.options);
    const options = JSON.stringify(this.props.options);
    if (
      prevProps.type !== this.props.type ||
      prevOptions !== options
    ) {
      this.render$.next();
    }
  }

  render() {
    return (
      <div style={{ minHeight: this.props.options?.height || 0 }} className="img-wrap" ref={this.puzzleRef}></div>
    )
  }

}

export default PuzzleGenPNG;