from pathlib import Path

from agents.remix_media import RemixJob, preview_job


def test_build_command_contains_expected_parts():
    job = RemixJob(
        input_path=Path("input.mp4"),
        output_path=Path("output.mp4"),
        filters=["scale=1280:-1", "format=yuv420p"],
        bitrate="6M",
    )
    cmd = job.build_command()
    assert "ffmpeg" in cmd
    assert "input.mp4" in cmd
    assert "output.mp4" in cmd
    assert "6M" in cmd
    assert "scale=1280:-1" in cmd


def test_preview_job_returns_command_string():
    job = RemixJob(
        input_path=Path("clip.mp4"),
        output_path=Path("out.mp4"),
        filters=["scale=1920:-1"],
    )
    result = preview_job(job)
    assert isinstance(result, str)
    assert len(result) > 0


def test_build_command_uses_default_bitrate():
    job = RemixJob(
        input_path=Path("a.mp4"),
        output_path=Path("b.mp4"),
        filters=[],
    )
    cmd = job.build_command()
    assert "6M" in cmd


def test_build_command_joins_filters_with_comma():
    job = RemixJob(
        input_path=Path("in.mp4"),
        output_path=Path("out.mp4"),
        filters=["scale=1280:-1", "format=yuv420p"],
    )
    cmd = job.build_command()
    assert "scale=1280:-1,format=yuv420p" in cmd
