package ofuangka.audiobo.domain;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Song {

	private String id;
	private int track;
	private String title;
	private String albumId;
	private int duration;
	private String artist;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public int getTrack() {
		return track;
	}

	public void setTrack(int track) {
		this.track = track;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getAlbumId() {
		return albumId;
	}

	public void setAlbumId(String albumId) {
		this.albumId = albumId;
	}

	public int getDuration() {
		return duration;
	}

	public void setDuration(int duration) {
		this.duration = duration;
	}

	public String getArtist() {
		return artist;
	}

	public void setArtist(String artist) {
		this.artist = artist;
	}
}
